from fastapi import APIRouter, File, UploadFile, HTTPException
from services.file_processor import FileProcessor
from services.statement_analyzer import StatementAnalyzer
from schemas.responses import UploadResponse
from typing import Dict, Any
from core.config import settings

router = APIRouter()

@router.post("/upload-statement", response_model=UploadResponse)
async def upload_bank_statement(file: UploadFile = File(...)):
    """
    Upload and process a bank statement file.
    Supports CSV, Excel formats, and PDF.
    """
    try:
        file_extension = "." + file.filename.split(".")[-1].lower()
        if file_extension not in settings.SUPPORTED_EXTENSIONS:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported file format. Supported formats: {', '.join(settings.SUPPORTED_EXTENSIONS)}"
            )
        
        processor = FileProcessor()
        df = await processor.process_file(file)
        analyzer = StatementAnalyzer()
        analysis_result = analyzer.analyze_statement(df, file.filename)
        
        return UploadResponse(
            success=True,
            message="File uploaded and processed successfully",
            data=analysis_result
        )
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred processing the file: {str(e)}")

@router.get("/supported-formats")
async def get_supported_formats():
    """Get list of supported file formats"""
    return {
        "supported_extensions": settings.SUPPORTED_EXTENSIONS,
        "max_file_size_mb": settings.MAX_FILE_SIZE // (1024 * 1024),
        "description": "Supported bank statement formats"
    }