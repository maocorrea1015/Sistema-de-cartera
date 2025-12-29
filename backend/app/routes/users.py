from __future__ import annotations
from typing import TYPE_CHECKING
from fastapi import APIRouter, Depends, HTTPException
import logging
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.users import UserCreate, UserOut
from fastapi.security import OAuth2PasswordRequestForm

from app.core.security import get_password_hash, verify_password, create_access_token

if TYPE_CHECKING:
    from app.models.models import User

router = APIRouter(prefix="/users", tags=["Users"])


@router.post("/", response_model=UserOut)
def create_user(data: UserCreate, db: Session = Depends(get_db)) -> "User":
    # importar en tiempo de ejecución para evitar import circular
    from app.models.models import User
    payload = data.model_dump(exclude_unset=True)
    password = payload.pop("password", None)
    if not password:
        raise HTTPException(status_code=400, detail="Password requerido")
    try:
        user = User(**payload)
        user.password_hash = get_password_hash(password)
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
    except Exception as e:
        db.rollback()
        logging.exception("Error creando usuario")
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    from app.models.models import User

    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not user.password_hash:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    if not verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token = create_access_token(data={"sub": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}
