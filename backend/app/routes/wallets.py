from fastapi import APIRouter, Depends, HTTPException
import logging
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.models import Wallet
from app.schemas.wallets import WalletCreate

router = APIRouter(prefix="/wallets", tags=["Wallets"])

@router.post("/")
def create_wallet(data: WalletCreate, db: Session = Depends(get_db)):
    payload = data.model_dump(exclude_unset=True)
    try:
        wallet = Wallet(**payload)
        db.add(wallet)
        db.commit()
        db.refresh(wallet)
        return wallet
    except Exception as e:
        db.rollback()
        logging.exception("Error creando wallet")
        raise HTTPException(status_code=400, detail=str(e))
