# Backend — Vivi Balas

API REST para o catálogo de produtos da Vivi Balas.  
Somente o admin precisa de autenticação; o cliente navega sem login.

---

## Stack

| Tecnologia | Versão | Papel |
|---|---|---|
| Node.js + TypeScript | TS 5.6 / ES2022 | Runtime e tipagem |
| Express | 4.x | Framework HTTP |
| better-sqlite3 | 11.x | Banco de dados SQLite embutido |
| jsonwebtoken | 9.x | Autenticação JWT |
| multer | 1.4 LTS | Upload de imagens |
| dotenv | 16.x | Variáveis de ambiente |
| tsx | 4.x | Execução TS com hot reload (dev) |

---

## Estrutura de pastas

```
backend/
├── server.ts               # Entry point — Express + middlewares + rotas
├── src/
│   ├── db.ts               # Conexão SQLite e funções CRUD
│   ├── middleware/
│   │   └── auth.ts         # Middleware JWT (requireAuth)
│   ├── routes/
│   │   ├── auth.ts         # POST /api/auth/login
│   │   └── products.ts     # CRUD /api/products
│   └── types/
│       └── index.ts        # Types: Product, ProductInsert, ProductUpdate, JwtPayload
├── uploads/                # Imagens enviadas (criado automaticamente)
├── dist/                   # Build compilado (gerado por tsc)
├── database.sqlite         # Banco SQLite (gerado automaticamente na raiz)
├── package.json
├── tsconfig.json
└── .env                    # Variáveis de ambiente (não comitar)
```

---

## Banco de dados

SQLite via **better-sqlite3**. O arquivo `database.sqlite` é criado automaticamente na raiz do backend ao iniciar.

### Schema da tabela `products`

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | TEXT PK | UUID v4 gerado pelo servidor |
| `name` | TEXT NOT NULL | Nome do produto |
| `category` | TEXT NOT NULL | Categoria |
| `description` | TEXT NOT NULL | Descrição |
| `price` | REAL | Preço (aceita vírgula ou ponto) |
| `image_url` | TEXT | Caminho `/uploads/<uuid>.<ext>` ou `null` |
| `created_at` | TEXT | `datetime('now')` (UTC) |

---

## Configuração

### 1. Instalar dependências

```bash
cd backend
npm install
```

### 2. Criar o `.env`

Copie o exemplo e edite:

```bash
cp .env.example .env
```

Variáveis disponíveis:

```env
ADMIN_EMAIL=admin@vivibalas.com   # e-mail do admin (padrão: admin@vivibalas.com)
ADMIN_PASSWORD=admin123           # senha do admin (padrão: admin123)
JWT_SECRET=troque-por-algo-longo  # segredo para assinar os tokens JWT
PORT=3001                         # porta do servidor (padrão: 3001)
```

> **Atenção:** em produção, sempre defina `JWT_SECRET` com uma string longa e aleatória.

---

## Executar

### Desenvolvimento (hot reload)

```bash
npm run dev
```

### Produção

```bash
npm run build   # compila TypeScript → dist/
npm start       # roda dist/server.js
```

O servidor sobe em `http://localhost:3001` e também fica acessível na rede local em `http://<ip-local>:3001`.

---

## Endpoints

### Saúde

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| GET | `/api/health` | Não | Retorna `{ "ok": true }` |

### Autenticação

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| POST | `/api/auth/login` | Não | Login do admin |

**POST /api/auth/login**

```json
// Body
{ "email": "admin@vivibalas.com", "password": "suasenha" }

// Resposta 200
{ "token": "<jwt>" }
```

O token tem validade de **7 dias**. Inclua-o em todas as rotas protegidas:

```
Authorization: Bearer <token>
```

---

### Produtos

| Método | Rota | Auth | Descrição |
|---|---|---|---|
| GET | `/api/products` | Não | Lista todos os produtos (ordem: mais recente primeiro) |
| GET | `/api/products/:id` | Não | Busca produto por ID |
| POST | `/api/products` | **Sim** | Cria produto |
| PUT | `/api/products/:id` | **Sim** | Atualiza produto |
| DELETE | `/api/products/:id` | **Sim** | Remove produto |

**Campos do produto (POST / PUT)**

Enviar como `multipart/form-data` quando houver imagem, ou `application/json` / `urlencoded` sem imagem.

| Campo | Obrigatório | Descrição |
|---|---|---|
| `name` | Sim | Nome do produto |
| `category` | Sim | Categoria |
| `description` | Sim | Descrição |
| `price` | Não | Número (aceita vírgula ou ponto decimal) |
| `image` | Não | Arquivo de imagem (máx. **5 MB**) |

No PUT, campos omitidos mantêm o valor atual. Se uma nova imagem for enviada, substitui a anterior.

**Exemplo de resposta (produto)**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Bala de Coco",
  "category": "Balas",
  "description": "Tradicional bala de coco artesanal",
  "price": 2.50,
  "image_url": "/uploads/550e8400-uuid.jpg",
  "created_at": "2026-03-11 10:00:00"
}
```

---

### Imagens

Imagens enviadas ficam em `backend/uploads/` com nome `<uuid>.<extensão>` e são servidas como estáticos em:

```
GET /uploads/<nome-do-arquivo>
```

---

## Autenticação — Fluxo resumido

```
Cliente          Servidor
  |                  |
  |-- POST /login -->|  verifica ADMIN_EMAIL + ADMIN_PASSWORD
  |<-- { token } ----|  assina JWT com JWT_SECRET (expira em 7 dias)
  |                  |
  |-- POST /products |
  |  Authorization:  |
  |  Bearer <token> >|  middleware requireAuth valida JWT
  |<-- 201 Created --|
```

---

## Observações técnicas

- CORS habilitado para **todas as origens** (`origin: true`) — restringir em produção se necessário.
- O servidor escuta em `0.0.0.0`, tornando-o acessível na rede local.
- O banco SQLite e a pasta `uploads/` são criados automaticamente se não existirem.
- IDs são **UUID v4** gerados pelo `crypto.randomUUID()` nativo do Node.
- `tsconfig.json` usa `"module": "NodeNext"` com ESM — todos os imports internos precisam de extensão `.js`.
