from pydantic import BaseModel

class WalletCreate(BaseModel):
    user_id: str
    currency: str
    name: str = "Main Wallet"
