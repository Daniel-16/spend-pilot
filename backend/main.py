from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config import settings
from routers.analyze import router as analyze_router

app = FastAPI(
    title="SpendPilot API",
    version="0.1.0",
    description="LLM-powered financial insights for your bank statements",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze_router)

@app.get("/")
def read_root():
    return {"message": "SpendPilot API is running", "version": "0.1.0", "status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host=settings.HOST, port=settings.PORT)