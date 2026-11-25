# API de Reserva de Salas

Projeto desenvolvido para a disciplina de Desenvolvimento de API Backend (Fase 3).
Sistema para gerenciamento e agendamento de salas e laboratórios.

## Tecnologias
- Node.js
- Express
- Prisma ORM
- SQLite
- Bcryptjs

## Como rodar o projeto

1. Instalar as dependências:
```bash
npm install
```

2. Executar as migrations do banco de dados:
```bash
npx prisma migrate dev
```

3. Popular o banco com os dados iniciais (usuário admin e salas):
```bash
npm run seed
```

4. Iniciar o servidor:
```bash
npm run dev
```
O servidor vai rodar por padrão em: `http://localhost:3000`

---

## Rotas disponíveis (Semana 16 - CRUD de Salas)

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `GET` | `/api/rooms` | Lista salas com paginação (`?page=1&size=10`) |
| `GET` | `/api/rooms/:id` | Busca uma sala específica por ID |
| `POST` | `/api/rooms` | Cadastra uma nova sala |
| `PUT` | `/api/rooms/:id` | Atualiza os dados de uma sala |
| `DELETE` | `/api/rooms/:id` | Remove uma sala do sistema |

### Exemplo de corpo para cadastro de sala (`POST /api/rooms`):
```json
{
  "name": "Laboratório de Redes",
  "capacity": 30,
  "location": "Bloco B - Sala 204"
}
```
