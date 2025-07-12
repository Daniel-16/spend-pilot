import pandas as pd
import io
import pdfplumber
from fastapi import UploadFile
from core.config import settings
from typing import Dict, Any, List, Optional

class FileProcessor:
    def __init__(self):
        self.supported_extensions = settings.SUPPORTED_EXTENSIONS
        self.max_file_size = settings.MAX_FILE_SIZE
    async def process_file(self, file: UploadFile) -> pd.DataFrame:
        if not file or not file.filename:
            raise ValueError("No file provided or filename is missing")
            
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

    def _sanitize_columns(self, columns: List[Optional[str]]) -> List[str]:
        """
        Sanitizes a list of column names to ensure they are unique.
        - Replaces None or empty strings with 'Unnamed'.
        - Appends a suffix (_2, _3, etc.) to duplicate column names.
        """
        new_cols = []
        counts = {}
        for col in columns:
            if col is None or str(col).strip() == '':
                col = 'Unnamed'
            else:
                col = str(col)

            if col in counts:
                counts[col] += 1
                new_cols.append(f"{col}_{counts[col]}")
            else:
                counts[col] = 1
                new_cols.append(col)
        return new_cols

    def process_pdf(self, content: bytes) -> pd.DataFrame:
        """
        Extract tables from a PDF bank statement and return as a DataFrame.
        """
        with pdfplumber.open(io.BytesIO(content)) as pdf:
            all_tables = []
            for page in pdf.pages:
                tables = page.extract_tables()
                for table in tables:
                    if table and len(table) > 1:
                        header = self._sanitize_columns(table[0])
                        df_table = pd.DataFrame(table[1:], columns=pd.Index(header))
                        all_tables.append(df_table)

            if not all_tables:
                raise ValueError("No tables found in PDF file. Please upload a statement with tabular data.")            
            df = pd.concat(all_tables, ignore_index=True)
            return df
        
    def get_file_info(self, file: UploadFile, content_size: int) -> Dict[str, Any]:
        return {
            "filename": file.filename,
            "content_type": file.content_type,
            "size_bytes": content_size,
            "size_mb": round(content_size / (1024 * 1024), 2),
        }