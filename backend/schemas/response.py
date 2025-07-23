from pydantic import BaseModel, Field
from typing import List, Dict, Optional

class Transaction(BaseModel):
    date: str = Field(examples=["2024-07-01"])
    description: str
    amount: float
    balance: Optional[float]
    category: str

class MonthlySummary(BaseModel):
    month: str = Field(examples=["2024-07"])
    inflow: float
    outflow: float
    closing_balance: float

class AnalyzeResponse(BaseModel):
    transactions: List[Transaction]
    spending_by_category: Dict[str, float]
    monthly_summary: List[MonthlySummary]
    runway_estimate: float

class ErrorResponse(BaseModel):
    detail: str 