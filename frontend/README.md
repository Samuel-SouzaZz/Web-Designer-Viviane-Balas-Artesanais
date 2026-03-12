# Frontend — Vivi Balas

Site de catálogo de doces artesanais (balas de coco, biscoitos e afins).  
Feito em React + TypeScript com Vite, Styled Components e roteamento via React Router.

---

## Stack

| Tecnologia | Versão | Papel |
|---|---|---|
| React | 19.x | UI |
| TypeScript | 5.9 | Tipagem |
| Vite | 7.x | Bundler e dev server |
| Styled Components | 6.x | CSS-in-JS com suporte a tema |
| React Router DOM | 7.x | Roteamento SPA |
| react-icons | 5.x | Ícones (WhatsApp, Instagram, etc.) |
| @supabase/supabase-js | 2.x | Cliente Supabase (opcional / reservado para futuro) |

---

## Estrutura de pastas

```
(raiz do projeto)
├── index.html                  # HTML base — monta #app, title da aba
├── vite.config.ts              # Configuração Vite (host: true para LAN)
├── tsconfig.json               # TypeScript strict mode, bundler resolution
├── package.json
├── .env                        # Variáveis de ambiente (não comitar)
├── public/
│   ├── logo.png                # Logo da Vivi Balas
│   └── fonts/
│       ├── BelindaAvenue-Regular.otf   # Fonte de títulos
│       └── Sunshine.ttf                # Fonte script (marca)
└── src/
    ├── main.tsx                # Entry point — monta <App /> no #app
    ├── App.tsx                 # Rotas, ThemeProvider, AdminRoute guard
    ├── theme.ts                # Design tokens: cores, fontes, radii, sombras
    ├── styled.d.ts             # Tipagem do tema para Styled Components
    ├── types/
    │   └── product.ts          # Types: Product, ProductForm
    ├── lib/
    │   ├── api.ts              # URL base da API, helpers de token (localStorage), getImageUrl
    │   └── supabase.ts         # Cliente Supabase (null se env vars não configuradas)
    ├── services/
    │   └── products.ts         # Todas as chamadas fetch ao backend
    ├── components/
    │   ├── Header.tsx          # Header responsivo com drawer menu (mobile)
    │   ├── Hero.tsx            # Seção hero com headline e CTA
    │   ├── ProductGrid.tsx     # Grid de produtos buscados do backend
    │   ├── ProductCard.tsx     # Card de produto com modal de detalhes
    │   ├── ContactSection.tsx  # Seção de contato (WhatsApp, Instagram, catálogo)
    │   └── Footer.tsx          # Rodapé
    ├── pages/
    │   ├── AdminLogin.tsx      # Tela de login do admin
    │   ├── AdminDashboard.tsx  # Painel admin — lista e gerencia produtos
    │   └── AdminProductForm.tsx # Formulário de criação / edição de produto
    └── styles/                 # Pasta reservada para GlobalStyles (vazia por ora)
```

---

## Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Criar o `.env`

```env
# URL do backend — use o IP local para testar no celular na mesma rede
VITE_API_URL=http://localhost:3001

# Opcional — só necessário se for integrar Supabase futuramente
# VITE_SUPABASE_URL=https://xxxx.supabase.co
# VITE_SUPABASE_ANON_KEY=chave-anon-publica
```

> `VITE_API_URL` padrão é `http://localhost:3001` se não definido.

---

## Executar

### Desenvolvimento

```bash
npm run dev
```

Abre em [http://localhost:5173](http://localhost:5173).  
Com `host: true` no `vite.config.ts`, também fica acessível no celular via IP da rede local.

### Build de produção

```bash
npm run build    # tsc + vite build → dist/
npm run preview  # preview do build gerado
```

---

## Rotas

| Rota | Componente | Auth | Descrição |
|---|---|---|---|
| `/` | `PublicSite` | Não | Site público completo |
| `/admin/login` | `AdminLogin` | Não | Login do admin |
| `/admin` | `AdminDashboard` | **Sim** | Painel de gestão de produtos |
| `/admin/novo` | `AdminProductForm` | **Sim** | Formulário de novo produto |
| `/admin/editar/:id` | `AdminProductForm` | **Sim** | Formulário de edição de produto |

Rotas protegidas usam o componente `AdminRoute`: redireciona para `/admin/login` se não houver token no `localStorage`.

---

## Autenticação (front)

- O token JWT retornado pelo backend é salvo em `localStorage` com a chave `admin_token`.
- Funções em `src/lib/api.ts`:
  - `getAuthToken()` — lê o token
  - `setAuthToken(token)` — salva o token após login
  - `clearAuthToken()` — remove o token no logout
- Todas as chamadas protegidas (`createProduct`, `updateProduct`, `deleteProduct`) incluem o header `Authorization: Bearer <token>` automaticamente via `src/services/products.ts`.

---

## Serviços — `src/services/products.ts`

| Função | Método HTTP | Auth | Descrição |
|---|---|---|---|
| `getProducts()` | GET `/api/products` | Não | Lista todos os produtos |
| `login(email, password)` | POST `/api/auth/login` | Não | Faz login, retorna `{ ok, token?, error? }` |
| `createProduct(form)` | POST `/api/products` | Sim | Cria produto (multipart/form-data) |
| `updateProduct(id, form)` | PUT `/api/products/:id` | Sim | Atualiza produto |
| `deleteProduct(id)` | DELETE `/api/products/:id` | Sim | Remove produto |

---

## Componentes públicos

### `Header`
- Logo à direita, links de navegação à esquerda no desktop.
- Mobile (< 600px): botão hamburguer abre um **drawer lateral** animado com backdrop.
- Links: `#inicio`, `#produtos`, `#contato` + botão CTA "Peça agora".

### `Hero`
- Seção com headline, subtítulo e botão "Ver produtos" ancorando em `#produtos`.

### `ProductGrid`
- Busca produtos do backend ao montar (`useEffect` com cleanup anti-race-condition).
- Exibe: carregando / erro / lista vazia / grid responsivo de cards.
- Grid: 1 coluna mobile, `auto-fill` com mínimo 280px a partir de 480px.

### `ProductCard`
- Mostra imagem (lazy), categoria, nome, descrição resumida (2 linhas clamp) e botão "Saiba mais".
- Abre um **modal** com imagem em destaque, preço formatado em BRL (`Intl.NumberFormat`), descrição completa e botões de ação.
- Modal no mobile ocupa tela cheia; no desktop é caixa centralizada com animação.
- Implementa **scroll lock** no `<body>` enquanto o modal está aberto (com restauração de `scrollY`).

### `ContactSection`
- Seção `#contato` com lista de links de contato:
  - **WhatsApp** — `https://wa.me/5532988583597`
  - **Instagram** — perfil `@vivibalasartesanais`
  - **Ver catálogo** — ancora em `#produtos`

### `Footer`
- Rodapé simples com nome da marca e copyright.

---

## Páginas admin

### `AdminLogin`
- Formulário de e-mail + senha, chama `login()`, salva token e redireciona para `/admin`.

### `AdminDashboard`
- Lista todos os produtos com miniatura, nome, categoria e preço.
- Ações: **Editar** (link para `/admin/editar/:id`), **Excluir** (com `confirm()`), **+ Novo produto**, **Sair**.

### `AdminProductForm`
- Modo duplo: criação (`/admin/novo`) e edição (`/admin/editar/:id`).
- No modo edição, pré-preenche campos com os dados existentes do produto.
- Campo imagem: no modo edição, deixar em branco mantém a foto atual.
- Envia via `multipart/form-data` quando há arquivo anexado.

---

## Design & Tema

Definido em `src/theme.ts`:

| Token | Valor | Uso |
|---|---|---|
| `primary` | `#80805D` | Verde oliva — cor principal |
| `primaryDark` | `#5C5C42` | Verde oliva escuro — botões, títulos |
| `secondary` | `#EDD7D5` | Rosa claro — fundo do header, bordas |
| `tertiary` | `#E7D4B5` | Bege claro — placeholders de imagem |
| `accent` | `#B65600` | Laranja queimado — hover, destaque |
| `background` | `#F5F0EB` | Bege/bakery — fundo geral |
| `surface` | `#FFFFFF` | Cards, modais |
| `text` | `#4A4A3F` | Texto principal |
| `textMuted` | `#6B6B5C` | Texto secundário |

**Fontes customizadas** (em `public/fonts/`):
- **Belinda Avenue** — títulos e headings
- **Sunshine** — nome da marca (script cursivo)
- **Georgia** — corpo de texto

**Breakpoint responsivo:** `600px` (mobile-first).

---

## Observações técnicas

- `vite.config.ts` com `server.host: true` — o dev server aceita conexões externas (LAN/celular).
- `src/styles/` está vazia — `GlobalStyles` ainda não foi implementado (estilos globais estão inline nos componentes por ora).
- O cliente Supabase (`src/lib/supabase.ts`) retorna `null` se as variáveis `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` não forem definidas — integração pronta para uso futuro.
- Imagens do backend são resolvidas via `getImageUrl()` em `src/lib/api.ts`: caminhos relativos como `/uploads/foto.jpg` são prefixados com `VITE_API_URL` automaticamente.
