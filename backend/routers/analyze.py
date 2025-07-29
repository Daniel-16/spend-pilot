from fastapi import APIRouter, UploadFile, File, HTTPException
from services.llm_client import analyze_pdf_with_gemini
from schemas.response import AnalyzeResponse, ErrorResponse
from core.config import settings
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

ALLOWED_EXTENSIONS = {'.pdf'}
ALLOWED_MIME_TYPES = {'application/pdf', 'application/x-pdf'}

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
    
    file_extension = '.' + file.filename.lower().split('.')[-1] if '.' in file.filename else ''
    if file_extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400, 
            detail=f"Only PDF files are supported. Got: {file_extension}"
        )
    
    content_type = file.content_type or "application/pdf"
    if content_type.lower() not in ALLOWED_MIME_TYPES:
        logger.warning(f"Unexpected content type: {content_type}, but proceeding with PDF processing")
        content_type = "application/pdf"
    
    try:
        content = await file.read()
    except Exception as e:
        logger.error(f"Failed to read file {file.filename}: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Failed to read file: {str(e)}")
    
    max_size_mb = settings.MAX_FILE_SIZE / (1024 * 1024)
    if len(content) > settings.MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400, 
            detail=f"File size exceeds {max_size_mb:.1f}MB limit"
        )
    
    if len(content) == 0:
        raise HTTPException(status_code=400, detail="File is empty")
    
    if not content.startswith(b'%PDF'):
        raise HTTPException(
            status_code=400, 
            detail="Invalid PDF file - missing PDF header"
        )
    
    try:
        logger.info(f"Starting analysis for file: {file.filename} ({len(content)} bytes)")
        
        result = await analyze_pdf_with_gemini(content, content_type)
        
        if isinstance(result, dict) and "error" in result:
            error_msg = result["error"]
            if "not a bank statement" in error_msg.lower():
                raise HTTPException(status_code=400, detail="The uploaded file does not appear to be a bank statement")
            else:
                raise HTTPException(status_code=400, detail=error_msg)
        
        if not isinstance(result, dict):
            logger.error(f"Invalid response type: {type(result)}")
            raise HTTPException(status_code=500, detail="Invalid response format from analysis service")
            
        required_fields = ["transactions", "spending_by_category", "monthly_summary", "runway_estimate"]
        missing_fields = [field for field in required_fields if field not in result]
        if missing_fields:
            logger.error(f"Missing fields in response: {missing_fields}")
            logger.error(f"Actual response keys: {list(result.keys())}")
            raise HTTPException(
                status_code=500, 
                detail=f"Incomplete analysis result. Missing: {', '.join(missing_fields)}"
            )
        
        logger.info(f"Analysis completed successfully for {file.filename}")
        return result
        
    except HTTPException:
        raise
    except ValueError as e:
        logger.error(f"Validation error for {file.filename}: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))
    except RuntimeError as e:
        error_str = str(e).lower()
        logger.error(f"Runtime error for {file.filename}: {str(e)}")
        
        if "api key" in error_str:
            raise HTTPException(status_code=500, detail="Server configuration error")
        elif "rate limit" in error_str or "quota" in error_str:
            raise HTTPException(
                status_code=429, 
                detail="Service temporarily unavailable due to rate limits. Please try again later."
            )
        elif "timed out" in error_str or "timeout" in error_str:
            raise HTTPException(
                status_code=504, 
                detail="Analysis request timed out. Please try again with a smaller file."
            )
        else:
            raise HTTPException(status_code=500, detail="Analysis service error")
    except Exception as e:
        logger.error(f"Unexpected error analyzing {file.filename}: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail="Unexpected server error during analysis")