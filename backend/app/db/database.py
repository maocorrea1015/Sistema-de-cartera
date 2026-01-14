from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings
import psycopg2
from urllib.parse import urlparse

# Parse DATABASE_URL to get db name
url = urlparse(settings.DATABASE_URL)
db_name = url.path.lstrip('/')
admin_url = settings.DATABASE_URL.replace(f"/{db_name}", "/postgres")

# Create database if not exists
try:
    conn = psycopg2.connect(admin_url)
    conn.autocommit = True
    cursor = conn.cursor()
    cursor.execute(f"CREATE DATABASE {db_name}")
    cursor.close()
    conn.close()
    print(f"Database '{db_name}' created.")
except psycopg2.Error as e:
    if "already exists" in str(e).lower():
        print(f"Database '{db_name}' already exists.")
    else:
        print("Error creating database:", e)
except Exception as e:
    print("Error:", e)

# engine uses settings.DATABASE_URL
engine = create_engine(settings.DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
