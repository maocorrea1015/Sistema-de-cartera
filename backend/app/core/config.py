import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    DATABASE_URL: str

def _get_env_or_raise(key: str) -> str:
    val = os.getenv(key)
    if val is None:
        raise RuntimeError(f"Variable de entorno {key} no definida")
    return val

settings = Settings()
settings.DATABASE_URL = _get_env_or_raise("DATABASE_URL")
