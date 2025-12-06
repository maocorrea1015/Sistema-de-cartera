from fastapi import APIRouter, Depends, HTTPException
import logging
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.models.models import Transaction
from app.schemas.transactions import TransactionCreate

router = APIRouter(prefix="/transactions", tags=["Transactions"])

@router.post("/")
def create_transaction(data: TransactionCreate, db: Session = Depends(get_db)):
    payload = data.model_dump(exclude_unset=True)
    try:
        transaction = Transaction(**payload)
        db.add(transaction)
        db.commit()
        db.refresh(transaction)
        return transaction
    except Exception as e:
        db.rollback()
        logging.exception("Error creando transacción")
        raise HTTPException(status_code=400, detail=str(e))
