from fastapi import APIRouter, Depends, HTTPException
import logging
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.users import UserCreate, UserOut
from app.core.security import get_password_hash

router = APIRouter(prefix="/api/auth", tags=["Auth"])

@router.post("/register", response_model=UserOut)
def register_user(data: UserCreate, db: Session = Depends(get_db)):
    # Importar en tiempo de ejecución para evitar import circular
    from app.models.models import User
    payload = data.model_dump(exclude_unset=True)
    password = payload.pop("password", None)
    if not password:
        raise HTTPException(status_code=400, detail="Password requerido")    
    # Verificar si el email ya existe
    existing_user = db.query(User).filter(User.email == payload["email"]).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    try:
        user = User(**payload)
        user.password_hash = get_password_hash(password)  # type: ignore
        db.add(user)
        db.commit()
        db.refresh(user)
        return user
    except Exception as e:
        db.rollback()
        logging.exception("Error creando usuario")
        raise HTTPException(status_code=400, detail=str(e))