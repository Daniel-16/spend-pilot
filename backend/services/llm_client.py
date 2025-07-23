import os
import json
import base64
import asyncio
from typing import List, Dict
from google import generativeai as genai
from core.config import settings
from core.system_prompt import SYSTEM_PROMPT

genai.configure(api_key=settings.GEMINI_API_KEY)

def chunk_pdf(pdf_bytes: bytes, chunk_size: int = 1024 * 1024) -> List[bytes]:
    """Split PDF into smaller chunks to handle large files."""
    return [pdf_bytes[i:i + chunk_size] for i in range(0, len(pdf_bytes), chunk_size)]

async def process_chunk(model, chunk: bytes, chunk_num: int, total_chunks: int) -> Dict:
    """Process a single PDF chunk with Gemini."""
    encoded_chunk = base64.b64encode(chunk).decode('utf-8')
    
    chunk_prompt = f"{SYSTEM_PROMPT}\nAnalyzing part {chunk_num} of {total_chunks}."
    
    try:
        response = await asyncio.to_thread(
            model.generate_content,
            [
                {"text": chunk_prompt},
                {"inlineData": {
                    "mimeType": "application/pdf",
                    "data": encoded_chunk
                }}
            ]
        )
        
        if not response.text:
            raise RuntimeError(f"Empty response for chunk {chunk_num}")
            
        return json.loads(response.text)
    except Exception as e:
        raise RuntimeError(f"Failed to process chunk {chunk_num}: {str(e)}")

async def analyze_pdf_with_gemini(file_bytes: bytes, file_mime: str) -> dict:
    """Analyze a PDF file using Gemini Vision API with chunking support."""
    if not settings.GEMINI_API_KEY:
        raise RuntimeError("Gemini API key not configured. Please set the GEMINI_API_KEY environment variable.")
    
    if not file_mime.lower() == "application/pdf":
        raise ValueError(f"Invalid file type. Expected application/pdf, got {file_mime}")

    try:
        model = genai.GenerativeModel('gemini-pro-vision')
        
        chunks = chunk_pdf(file_bytes)
        total_chunks = len(chunks)
        
        if total_chunks > 1:
            tasks = [
                process_chunk(model, chunk, i + 1, total_chunks)
                for i, chunk in enumerate(chunks)
            ]
            chunk_results = await asyncio.gather(*tasks)
            
            merged_result = {
                "summary": "",
                "stats": {
                    "avg_daily_spend": 0,
                    "total_debit": 0,
                    "runway_days": 0
                },
                "transactions": []
            }
            
            for result in chunk_results:
                if "transactions" in result:
                    merged_result["transactions"].extend(result["transactions"])
                if "summary" in result:
                    merged_result["summary"] += result["summary"] + " "
                if "stats" in result:
                    stats = result["stats"]
                    merged_result["stats"]["total_debit"] += stats.get("total_debit", 0)
                    
            if merged_result["transactions"]:
                total_transactions = len(merged_result["transactions"])
                merged_result["stats"]["avg_daily_spend"] = (
                    merged_result["stats"]["total_debit"] / 30
                )
                if merged_result["stats"]["avg_daily_spend"] > 0:
                    merged_result["stats"]["runway_days"] = (
                        merged_result["stats"]["total_debit"] /
                        merged_result["stats"]["avg_daily_spend"]
                    )
            
            return merged_result
        else:
            response = await asyncio.to_thread(
                model.generate_content,
                [
                    {"text": SYSTEM_PROMPT},
                    {"inlineData": {
                        "mimeType": file_mime,
                        "data": base64.b64encode(file_bytes).decode('utf-8')
                    }}
                ]
            )
            
            if not response.text:
                raise RuntimeError("Empty response from Gemini API")
            
            return json.loads(response.text)
            
    except Exception as e:
        raise RuntimeError(f"Failed to analyze PDF: {str(e)}") 