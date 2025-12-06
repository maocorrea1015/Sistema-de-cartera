from sqlalchemy import Column, String, Boolean, DateTime, Numeric, ForeignKey, JSON#, #CheckConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import uuid
from app.db.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, nullable=False)
    full_name = Column(String, nullable=False)
    phone = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    metadata_ = Column("metadata", JSON)

    # Asegúrate de que en Wallet el atributo que referencia al usuario se llame `user`
    wallets = relationship("Wallet", back_populates="user")


class Wallet(Base):
    __tablename__ = "wallets"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    name = Column(String, default="Main Wallet")
    currency = Column(String(3), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now())
    metadata_ = Column("metadata", JSON)

    user = relationship("User", back_populates="wallets")
    transactions = relationship("Transaction", back_populates="wallet")


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    wallet_id = Column(UUID(as_uuid=True), ForeignKey("wallets.id", ondelete="CASCADE"), nullable=False)
    type = Column(String, nullable=False)
    direction = Column(String, nullable=False)
    amount = Column(Numeric(20, 8), nullable=False)
    currency = Column(String(3), nullable=False)
    status = Column(String, nullable=False)
    related_tx = Column(UUID(as_uuid=True), ForeignKey("transactions.id"))
    idempotency_key = Column(String)
    balance_before = Column(Numeric(20, 8))
    balance_after = Column(Numeric(20, 8))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    processed_at = Column(DateTime(timezone=True))
    metadata_ = Column("metadata", JSON)

    wallet = relationship("Wallet", back_populates="transactions")
