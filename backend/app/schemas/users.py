from pydantic import BaseModel, EmailStr, ConfigDict
from datetime import datetime
from uuid import UUID

class UserCreate(BaseModel):
    email: EmailStr
    full_name: str
    phone: str | None = None
    password: str


class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    email: EmailStr
    full_name: str
    phone: str | None = None
    is_active: bool
    created_at: datetime | None
