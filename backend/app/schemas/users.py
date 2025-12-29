from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserCreate(BaseModel):
    email: EmailStr
    full_name: str
    phone: str | None = None
    password: str


class UserOut(BaseModel):
    id: str
    email: EmailStr
    full_name: str
    phone: str | None = None
    is_active: bool
    created_at: datetime | None

    class Config:
        orm_mode = True
