from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    email: EmailStr
    full_name: str
    phone: str | None = None
