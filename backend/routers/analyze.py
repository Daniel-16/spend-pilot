from fastapi import APIRouter, UploadFile, File, HTTPException
from services.llm_client import analyze_pdf_with_gemini
from schemas.response import AnalyzeResponse, ErrorResponse
from core.config import settings
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

@router.post(
    "/analyze-statement", 
    response_model=AnalyzeResponse, 
    responses={
        400: {"model": ErrorResponse}, 
        429: {"model": ErrorResponse},
        500: {"model": ErrorResponse},
        504: {"model": ErrorResponse}
    }
)
async def analyze_statement(file: UploadFile = File(...)):
    """Analyze a bank statement PDF and extract financial data."""
    
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")
    
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    if not file.content_type or file.content_type.lower() != "application/pdf":
        raise HTTPException(status_code=400, detail="Invalid content type. Expected application/pdf")
    
    try:
        content = await file.read()
    except Exception as e:
        logger.error(f"Failed to read file {file.filename}: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Failed to read file: {str(e)}")
    
    if len(content) > settings.MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400, 
            detail=f"File size exceeds {settings.MAX_FILE_SIZE / (1024*1024):.1f}MB limit"
        )
    
    if len(content) == 0:
        raise HTTPException(status_code=400, detail="File is empty")
    
    try:
        result = await analyze_pdf_with_gemini(content, file.content_type)
        
        if isinstance(result, dict) and "error" in result:
            raise HTTPException(status_code=400, detail=result["error"])
        
        if not isinstance(result, dict):
            raise HTTPException(status_code=500, detail="Invalid response format from analysis service")
            
        required_fields = ["transactions", "spending_by_category", "monthly_summary", "runway_estimate"]
        missing_fields = [field for field in required_fields if field not in result]
        if missing_fields:
            logger.error(f"Missing fields in response: {missing_fields}")
            raise HTTPException(status_code=500, detail="Incomplete analysis result")
        
        return result
        
    except HTTPException:
        raise
    except ValueError as e:
        logger.error(f"Validation error: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except RuntimeError as e:
        error_str = str(e).lower()
        if "api key" in error_str:
            logger.error("API key configuration error")
            raise HTTPException(status_code=500, detail="Server configuration error")
        elif "rate limit" in error_str or "quota" in error_str:
            logger.warning("Rate limit exceeded")
            raise HTTPException(status_code=429, detail="Service temporarily unavailable. Please try again later.")
        elif "timed out" in error_str or "timeout" in error_str:
            logger.warning("Request timeout")
            raise HTTPException(status_code=504, detail="Analysis request timed out. Please try again.")
        else:
            logger.error(f"Runtime error: {str(e)}")
            raise HTTPException(status_code=500, detail="Analysis service error")
    except Exception as e:
        logger.error(f"Unexpected error analyzing {file.filename}: {str(e)}")
        raise HTTPException(status_code=500, detail="Unexpected server error")