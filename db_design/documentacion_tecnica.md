# 03-documentacion_tecnica.md
## Diseño BD - Sistema de Cartera

### Tablas Principales
- **users**: Usuarios del sistema
- **wallets**: Carteras por usuario/moneda
- **transactions**: Ledger inmutable
- **balances**: Cache de saldos
- **exchange_rates**: Tasas de cambio
- **audit_logs**: Trazabilidad
- **idempotency_keys**: Control duplicados

### Decisiones Clave
- UUIDs como PKs
- Numeric(20,8) para montos
- Transacciones append-only
- Balances materializados
- Idempotencia para APIs

### Índices Críticos
- Búsqueda por email
- Historial por wallet
- Transacciones pendientes
- Tasas por par de monedas
- Auditoría por fecha