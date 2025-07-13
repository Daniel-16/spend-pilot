from fastapi import APIRouter, UploadFile, File, HTTPException, status
from services.llm_client import analyze_pdf_with_gemini
from schemas.response import AnalyzeResponse, ErrorResponse
from core.config import settings

router = APIRouter()

@router.post("/analyze-statement", response_model=AnalyzeResponse, responses={400: {"model": ErrorResponse}, 500: {"model": ErrorResponse}})
async def analyze_statement(file: UploadFile = File(...)):
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    content = await file.read()
    if len(content) > settings.MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File size exceeds 10MB limit.")
    try:
        result = await analyze_pdf_with_gemini(content, file.content_type or "")
        if "error" in result:
            raise HTTPException(status_code=400, detail=result["error"])
        return result
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 