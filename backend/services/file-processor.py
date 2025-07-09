import pandas as pd
import io
from fastapi import UploadFile
from core.config import settings
from typing import Dict, Any

class FileProcessor:
    def __init__(self):
        self.supported_extensions = settings.SUPPORTED_EXTENSIONS
        self.max_file_size = settings.MAX_FILE_SIZE
        
    async def process_file(self, file: UploadFile) -> pd.DataFrame:
        file_extension = '.' + file.filename.split('.')[-1].lower()
        if file_extension not in self.supported_extensions:
            raise ValueError(f"Unsupported file extension: {file_extension}. Supported extensions: {', '.join(self.supported_extensions)}")
        
        content = await file.read()
        
        if len(content) > self.max_file_size:
            raise ValueError("File size exceeds 10MB limit")
        
        try:
            if file_extension == ".csv":
                df = pd.read_csv(io.StringIO(content.decode('utf-8')))
            elif file_extension in [".xlsx", ".xls"]:
                df = pd.read_excel(io.BytesIO(content))
            elif file_extension == ".pdf":
                df = self.process_pdf(content)
            else:
                raise ValueError(f"Unsupported file extension: {file_extension}")
            
            if df.empty:
                raise ValueError("The uploaded file is empty")
            
            return df
        except Exception as e:
            raise ValueError(f"Error processing file: {str(e)}")
        
    def process_pdf(self, content: bytes) -> pd.DataFrame:
        # TODO: Implement PDF processing logic
        
    def get_file_info(self, file: UploadFile, content_size: int) -> Dict[str, Any]:
        return {
            "filename": file.filename,
            "content_type": file.content_type,
            "size_bytes": content_size,
            "size_mb": round(content_size / (1024 * 1024), 2),
        }