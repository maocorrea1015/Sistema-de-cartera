# Diagrama ER - Sistema de Cartera

![Diagrama ER](./diagrama-er.png)

## Relaciones Principales
- Users 1:N Wallets
- Wallets 1:N Transactions  
- Wallets 1:1 Balances
- Transactions N:1 Transactions (self-reference)