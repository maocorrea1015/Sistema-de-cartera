import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

def _get_env_or_raise(key: str) -> str:
    val = os.getenv(key)
    if val is None:
        raise RuntimeError(f"Variable de entorno {key} no definida")
    return val

settings = Settings()
settings.DATABASE_URL = _get_env_or_raise("DATABASE_URL")
settings.SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-change-me")
settings.ALGORITHM = os.getenv("ALGORITHM", "HS256")
settings.ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))
