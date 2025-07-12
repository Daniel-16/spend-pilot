from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "SpendPilot API"
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:8000",
        "http://localhost:8080",
        "http://localhost:8081",
        "http://localhost:8082",
        "http://localhost:8083",
        "http://localhost:8084",
        "http://localhost:8085",
    ]
    
    # File Upload Configuration
    MAX_FILE_SIZE: int = 1024 * 1024 * 10
    SUPPORTED_EXTENSIONS: List[str] = [".xlsx", ".xls", ".csv", ".pdf"]
    
    class Config:
        env_file = ".env"
        
settings = Settings()