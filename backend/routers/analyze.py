from fastapi import APIRouter, UploadFile, File, HTTPException
from services.llm_client import analyze_pdf_with_gemini
from schemas.response import AnalyzeResponse, ErrorResponse
from core.config import settings

router = APIRouter()

@router.post("/analyze-statement", response_model=AnalyzeResponse, responses={400: {"model": ErrorResponse}, 500: {"model": ErrorResponse}})
async def analyze_statement(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    if not file.content_type or file.content_type.lower() != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid content type. Expected application/pdf")
    
    try:
        content = await file.read()
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to read file: {str(e)}")
    
    if len(content) > settings.MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail=f"File size exceeds {settings.MAX_FILE_SIZE / (1024*1024)}MB limit")
    elif len(content) == 0:
        raise HTTPException(status_code=400, detail="File is empty")
        
    try:
        result = await analyze_pdf_with_gemini(content, file.content_type)
        
        if not isinstance(result, dict):
            raise HTTPException(status_code=500, detail="Invalid response format from analysis service")
        if "error" in result:
            raise HTTPException(status_code=400, detail=result["error"])
            
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except RuntimeError as e:
        if "API key" in str(e):
            raise HTTPException(status_code=500, detail="Server configuration error: API key missing or invalid")
        elif "rate limit" in str(e):
            raise HTTPException(status_code=429, detail="Too many requests. Please try again later")
        elif "timed out" in str(e):
            raise HTTPException(status_code=504, detail="Analysis request timed out")
        else:
            raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}") 