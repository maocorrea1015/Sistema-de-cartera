from __future__ import annotations
from typing import TYPE_CHECKING
from fastapi import APIRouter, Depends, HTTPException
import logging
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.users import UserCreate

if TYPE_CHECKING:
    from app.models.models import User

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/")
def create_user(data: UserCreate, db: Session = Depends(get_db)) -> "User":
    # importar en tiempo de ejecución para evitar import circular
    from app.models.models import User
    payload = data.model_dump(exclude_unset=True)
    try:
        user = User(**payload)
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
    except Exception as e:
        db.rollback()
        logging.exception("Error creando usuario")
        raise HTTPException(status_code=400, detail=str(e))
