import httpx
import os
import json
from core.config import settings
import base64
from core.system_prompt import SYSTEM_PROMPT

GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent"
GEMINI_API_KEY = settings.GEMINI_API_KEY

async def analyze_pdf_with_gemini(file_bytes: bytes, file_mime: str) -> dict:
    if not GEMINI_API_KEY:
        raise RuntimeError("Gemini API key not configured.")
    
    api_url_with_key = f"{GEMINI_API_URL}?key={GEMINI_API_KEY}"
    encoded_file_data = base64.b64encode(file_bytes).decode("utf-8")
    data = {
        "contents": [
            {"parts": [
                {"text": SYSTEM_PROMPT},
                {"inlineData": {"mimeType": file_mime, "data": encoded_file_data}}
            ]}
        ]
    }
    async with httpx.AsyncClient(timeout=60) as client:
        response = await client.post(api_url_with_key, json=data)
    if response.status_code != 200:
        raise RuntimeError(f"Gemini API error: {response.text}")
    result = response.json()
    reply = result.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")
    try:
        return json.loads(reply)
    except Exception as e:
        raise RuntimeError(f"Gemini response is not valid JSON: {reply}") 