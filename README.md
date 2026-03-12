# Vivi Balas — Originais Balas e Biscoitos Artesanais

Projeto completo do site de catálogo da Vivi Balas, dividido em **frontend** e **backend** independentes.

---

## Estrutura do projeto

```
ViviBalas/
├── backend/    # API REST (Node.js + TypeScript + Express + SQLite)
├── frontend/   # Site React (React + TypeScript + Vite + Styled Components)
└── Viviane/    # Arquivos avulsos / referências
```

Cada pasta tem seu próprio `package.json`, `node_modules` e README com documentação detalhada.

---

## Início rápido

### Backend

```bash
cd backend
npm install
cp .env.example .env   # edite com ADMIN_EMAIL, ADMIN_PASSWORD e JWT_SECRET
npm run dev
```

Sobe em `http://localhost:3001`.  
→ Documentação completa: [`backend/README.md`](./backend/README.md)

### Frontend

```bash
cd frontend
npm install
# edite o .env e defina VITE_API_URL=http://localhost:3001
npm run dev
```

Abre em `http://localhost:5173`.  
→ Documentação completa: [`frontend/README.md`](./frontend/README.md)

---

## Visão geral

| Camada | Tecnologia principal | Porta padrão |
|---|---|---|
| Backend | Express + SQLite + JWT | 3001 |
| Frontend | React + Vite + Styled Components | 5173 |

O frontend consome a API do backend via `VITE_API_URL`.  
Somente o admin precisa de login; o catálogo público é acessado sem autenticação.
