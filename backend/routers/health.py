from fastapi import APIRouter
from datetime import datetime

router = APIRouter()

@router.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "SpendPilot API",
        "version": "0.1.0",
        "timestamp": datetime.now().isoformat(),
    }
    
@router.get("/ping")
def ping():
    return {"message": "pong"}