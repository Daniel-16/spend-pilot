from pydantic import BaseModel, Field
from typing import List, Dict, Optional

class Transaction(BaseModel):
    date: str = Field(..., description="Transaction date in YYYY-MM-DD format")
    description: str = Field(..., description="Transaction description")
    amount: float = Field(..., description="Transaction amount (negative for debits, positive for credits)")
    balance: Optional[float] = Field(None, description="Account balance after transaction")
    category: str = Field(..., description="Transaction category")

class MonthlySummary(BaseModel):
    month: str = Field(..., description="Month in YYYY-MM format")
    inflow: float = Field(..., description="Total inflow for the month")
    outflow: float = Field(..., description="Total outflow for the month")
    closing_balance: float = Field(..., description="Closing balance for the month")

class AnalyzeResponse(BaseModel):
    transactions: List[Transaction] = Field(..., description="List of all transactions")
    spending_by_category: Dict[str, float] = Field(..., description="Total spending by category")
    monthly_summary: List[MonthlySummary] = Field(..., description="Monthly financial summary")
    runway_estimate: float = Field(..., description="Estimated financial runway in months")

class ErrorResponse(BaseModel):
    error: str = Field(..., description="Error message")
    detail: Optional[str] = Field(None, description="Additional error details")