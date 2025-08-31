import os
from dotenv import load_dotenv
load_dotenv()

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret")
    JWT_SECRET = os.getenv("JWT_SECRET", "jwt-secret")
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///database.db")
    USE_YFINANCE = os.getenv("USE_YFINANCE", "true").lower() in ("1","true","yes")
