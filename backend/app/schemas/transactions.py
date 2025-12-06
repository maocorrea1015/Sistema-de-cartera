from pydantic import BaseModel

class TransactionCreate(BaseModel):
    wallet_id: str
    type: str
    direction: str
    amount: float
    currency: str
