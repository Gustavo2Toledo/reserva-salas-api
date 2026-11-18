# API Reserva de Salas

Projeto para agendamento e reserva de salas e laboratórios - Fase 3 (Desenvolvimento de API Backend).

## Tecnologias
- Node.js
- Express
- Prisma ORM com SQLite

## Como rodar o banco
1. Instalar as dependências:
```bash
npm install
```

2. Executar a migration para criar as tabelas no SQLite:
```bash
npx prisma migrate dev --name init
```
