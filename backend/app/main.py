from fastapi import FastAPI
from app.routes import users, wallets, transactions, auth
from app.db.database import Base, engine

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(wallets.router)
app.include_router(transactions.router)
