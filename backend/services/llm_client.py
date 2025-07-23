import os
import json
import base64
import asyncio
from typing import Dict, Any

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage
from langchain_core.output_parsers import JsonOutputParser

from core.config import settings
from core.system_prompt import SYSTEM_PROMPT

async def analyze_pdf_with_gemini(file_bytes: bytes, file_mime: str) -> Dict[str, Any]:
    if not settings.GEMINI_API_KEY:
        raise RuntimeError("Gemini API key not configured.")

    if not file_mime.lower() == "application/pdf":
        raise ValueError(f"Invalid file type. Expected application/pdf, got {file_mime}")

    try:
        llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash")
        parser = JsonOutputParser()
        chain = llm | parser
        b64_pdf = base64.b64encode(file_bytes).decode('utf-8')
        message = HumanMessage(
            content=[
                {"type": "text", "text": SYSTEM_PROMPT},
                {
                    "type": "image_url",
                    "image_url": {"url": f"data:{file_mime};base64,{b64_pdf}"}
                }
            ]
        )
        result = await chain.ainvoke([message])
        if "error" in result:
            return result
        required_fields = ["transactions", "spending_by_category", "monthly_summary", "runway_estimate"]
        missing_fields = [field for field in required_fields if field not in result]
        if missing_fields:
            raise ValueError(f"Missing required fields in response: {missing_fields}")
        return result

    except Exception as e:
        if "API key" in str(e):
            raise RuntimeError("API key missing or invalid")
        elif "quota" in str(e).lower() or "rate limit" in str(e).lower():
            raise RuntimeError("Rate limit exceeded")
        elif "timeout" in str(e).lower():
            raise RuntimeError("Request timed out")
        else:
            raise RuntimeError(f"Failed to analyze PDF: {str(e)}")
