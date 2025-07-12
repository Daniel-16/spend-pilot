import httpx
import os
import json
from core.config import settings
from core.system_prompt import SYSTEM_PROMPT

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", getattr(settings, "GEMINI_API_KEY", None))
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent"

async def analyze_pdf_with_gemini(file_bytes: bytes, file_mime: str) -> dict:
    if not GEMINI_API_KEY:
        raise RuntimeError("Gemini API key not configured.")
    data = {
        "contents": [
            {"parts": [
                {"text": SYSTEM_PROMPT},
                {"inlineData": {"mimeType": file_mime, "data": file_bytes.decode("latin1")}}
            ]}
        ]
    }
    headers = {"Authorization": f"Bearer {GEMINI_API_KEY}"}
    async with httpx.AsyncClient(timeout=60) as client:
        response = await client.post(GEMINI_API_URL, headers=headers, json=data)
    if response.status_code != 200:
        raise RuntimeError(f"Gemini API error: {response.text}")
    result = response.json()
    reply = result.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "")
    try:
        return json.loads(reply)
    except Exception as e:
        raise RuntimeError(f"Gemini response is not valid JSON: {reply}") 