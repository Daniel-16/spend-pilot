from pydantic import BaseModel
from typing import Dict, Any, List, Optional

class UploadResponse(BaseModel):
    """Response model for file upload endpoint"""
    success: bool
    message: str
    data: Dict[str, Any]

class HealthResponse(BaseModel):
    """Response model for health check"""
    status: str
    service: str
    timestamp: str
    version: str

class ErrorResponse(BaseModel):
    """Response model for errors"""
    detail: str
    error_code: Optional[str] = None

class StatsModel(BaseModel):
    """Statistics about the uploaded file"""
    filename: str
    total_rows: int
    total_columns: int
    columns: List[str]
    memory_usage_mb: float

class AmountInsights(BaseModel):
    """Insights from transaction amounts"""
    total_transactions: int
    total_amount: float
    average_transaction: float
    median_transaction: float
    min_transaction: float
    max_transaction: float
    positive_transactions: int
    negative_transactions: int
    zero_transactions: int

class DateInsights(BaseModel):
    """Insights from transaction dates"""
    earliest_transaction: str
    latest_transaction: str
    date_range_days: int
    transactions_with_valid_dates: int

class DescriptionInsights(BaseModel):
    """Insights from transaction descriptions"""
    unique_descriptions: int
    most_common_words: Dict[str, int]
    average_description_length: float