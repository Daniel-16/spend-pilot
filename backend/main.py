from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import upload, health
from core.config import settings

app = FastAPI(
    title="SpendPilot API",
    version="0.1.0",
    description="AI-powered financial insights for your bank statements",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router, prefix="/api/v1", tags=["upload"])
app.include_router(health.router, prefix="/api/v1", tags=["health"])

@app.get("/")
def read_root():
    return {
        "message": "SpendPilot API is running",
        "version": "0.1.0",
        "status": "healthy",
    }
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=settings.HOST, port=settings.PORT)