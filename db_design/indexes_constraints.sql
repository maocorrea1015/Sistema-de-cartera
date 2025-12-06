--02 indexes_constraints.sql
-- Usuarios
CREATE INDEX idx_users_email ON users(email);

-- Wallets
CREATE INDEX idx_wallets_user_id ON wallets(user_id);
CREATE INDEX idx_wallets_currency ON wallets(currency);

-- Transactions
CREATE INDEX idx_transactions_wallet_id_created ON transactions(wallet_id, created_at DESC);
CREATE INDEX idx_transactions_status_created ON transactions(status, created_at);
CREATE INDEX idx_transactions_idempotency ON transactions(idempotency_key) WHERE idempotency_key IS NOT NULL;
CREATE UNIQUE INDEX idx_transactions_idempotency_unique ON transactions(idempotency_key) WHERE idempotency_key IS NOT NULL;

-- Exchange rates
CREATE INDEX idx_exchange_rates_currency_pair ON exchange_rates(from_currency, to_currency, valid_from DESC);

-- Audit logs
CREATE INDEX idx_audit_logs_created ON audit_logs(created_at DESC);
CREATE INDEX idx_audit_logs_object ON audit_logs(object_type, object_id);