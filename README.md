# 🏨 PousaÊ

> Plataforma moderna para descobrir, reservar e gerenciar experiências de viagem.

**PousaÊ** é uma aplicação full‑stack criada com React (frontend) e FastAPI (backend), com PostgreSQL para persistência. A proposta é oferecer descoberta de viagens, gestão de perfil, compra segura de experiências e suporte com IA.


---

<div align="center">

![Demo](https://img.shields.io/badge/Live-pousa.vercel.app-00b894?style=for-the-badge&logo=vercel)

<p>
  <img src="https://skillicons.dev/icons?i=python,fastapi,postgres,html,css,bootstrap,js,react,vite,git,github,vscode" alt="tech icons" />
</p>

<p>
  ![JavaScript](https://img.shields.io/badge/JavaScript-49.9%25-F7DF1E?style=flat-square&logo=javascript)
  ![Python](https://img.shields.io/badge/Python-29.6%25-3776AB?style=flat-square&logo=python)
  ![CSS](https://img.shields.io/badge/CSS-20.3%25-1572B6?style=flat-square&logo=css3)
  ![HTML](https://img.shields.io/badge/HTML-0.2%25-E34F26?style=flat-square&logo=html5)
</p>

</div>

---

## 📊 Status do projeto

| Aspecto | Status |
|---|---:|
| **Nota geral** | 8.5 / 10 ⭐ |
| **Frontend** | ✅ Funcional |
| **Backend** | ✅ Operacional |
| **Banco de dados** | ✅ PostgreSQL configurado |
| **Deployment** | ✅ Vercel (frontend) |

---

## 🖥️ Tecnologias (resumo)

- Frontend: React, Vite, JavaScript, HTML, CSS, Bootstrap
- Backend: Python, FastAPI, Pydantic
- Banco: PostgreSQL (psycopg2)
- Autenticação: cookies HTTP‑only + tokens UUID
- IA: Gemini (chatbot + moderação)
- Upload de imagens: ImgBB
- Deploy: Vercel


---

## ✨ Funcionalidades principais

- Cadastro e login de usuários (validação de e‑mail, CPF, senha)
- Sessões seguras com cookies HTTP‑only
- Perfil do usuário com imagem, saldo e histórico
- Listagem de viagens, busca e filtros
- Visualização detalhada da viagem (datas, preço, limite de viajantes, política para pets)
- Compra de viagens com verificação de saldo e proteção contra auto‑compra
- Sistema de favoritos (star/bookmark)
- Comentários e avaliações com moderação automática (Gemini)
- Assistente virtual com IA

---

## 🔐 Segurança & boas práticas

- Senhas armazenadas com Argon2 (hash seguro)
- Cookies: HttpOnly, Secure (em produção), SameSite configurado
- Rate limiting (IP) configurado no backend
- CORS configurado e cabeçalhos expostos quando necessário
- Moderação automática de comentários (detecção de discurso de ódio e conteúdo impróprio)

---

## 🔌 Endpoints principais (resumo)

User:
```
POST   /registerUser    - Registrar usuário
POST   /login           - Autenticar usuário
GET    /checkUser       - Verificar sessão
GET    /getUser         - Obter dados do usuário autenticado
POST   /upload-image    - Enviar imagem de perfil
```

Trips & compra:
```
POST   /trips           - Criar nova viagem
GET    /getTrips        - Listar viagens
POST   /buyTrip         - Comprar viagem
POST   /addStar         - Adicionar favorito
POST   /removeStar      - Remover favorito
GET    /getStar         - Listar favoritos
```

Comentários/AI:
```
POST   /createComment   - Criar comentário (moderação automática)
POST   /getComment      - Obter comentários
POST   /chatbot         - Chat com assistente (IA)
```

---

## 🏗️ Arquitetura (visão rápida)

```
Frontend (React + Vite)
  - Components: Home, Trips, Dashboard
  - Styling: Bootstrap + CSS
         |
         | REST API
         v
Backend (FastAPI + Python)
  - Routers: User, Trips, Comments, Chatbot
  - Middleware: CORS, Rate Limiting
         |
         v
Database (PostgreSQL)
```

---

## 📂 Estrutura do repositório

```text
Pousa-/
├── API/
│   ├── Databases/
│   ├── Routers/
│   ├── SQL/
│   ├── Validation/
│   ├── main.py
│   ├── requirements.txt
│   └── .env.example
├── public/
├── previews/          # imagens e screenshots do projeto
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── Components/
│   ├── StylesGlobals/
│   └── assets/
├── .env.example
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package.json
├── pnpm-lock.yaml
├── vite.config.js
├── vercel.json
└── README.md
```

---

## 🗄️ Esquema do banco (resumo)

Users (`usersPousae`):
```
id SERIAL PRIMARY KEY
name VARCHAR(150) NOT NULL
email VARCHAR(254) NOT NULL
password VARCHAR(255) NOT NULL -- Argon2 hashed
session_token UUID UNIQUE
cpf VARCHAR(14)
money NUMERIC(10,2) DEFAULT 1000.00
image_url TEXT
moneyalreadyspent NUMERIC(10,2) DEFAULT 0.0
tripsTaken INTEGER DEFAULT 0
star INT[]
comments INT[]
```

Trips:
```
id SERIAL PRIMARY KEY
name VARCHAR NOT NULL
description TEXT NOT NULL
startDate DATE NOT NULL
endDate DATE NOT NULL
numberOfTravelers INT NOT NULL
petsAllowed BOOLEAN
price NUMERIC(10,2) NOT NULL
session_token UUID -- owner
review FLOAT DEFAULT 0
usersPurchased UUID[]
comments TEXT[]
usersComments UUID[]
notes INT[]
```

---

## 🚀 Como rodar localmente

Pré‑requisitos:
- Node.js 18+ e pnpm
- Python 3.10+
- PostgreSQL

Passos rápidos:

1) Clone
```bash
git clone https://github.com/joaopedro236/Pousa-.git
cd Pousa-
```

2) Frontend
```bash
pnpm install
pnpm dev
# app: http://localhost:5173
```

3) Backend
```bash
cd API
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS/Linux
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
# api: http://localhost:8000/docs
```

4) Banco
- Use o `.env.example` como referência e crie suas bases no Postgres

---

## 🔧 Variáveis de ambiente (exemplo)

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pousa_users
DB_USER=postgres
DB_PASSWORD=your_password

DB_HOST_TRIP=localhost
DB_PORT_TRIP=5432
DB_NAME_TRIP=pousa_trips
DB_USER_TRIP=postgres
DB_PASSWORD_TRIP=your_password

VITE_API_URL=http://localhost:8000
FRONTEND_URLS=http://localhost:5173,http://localhost:3000
IMGBB_URL=your_imgbb_key
GEMINI_API_KEY=your_gemini_key
```

---

## 📦 Scripts (frontend)

```bash
pnpm dev
pnpm build
pnpm preview
pnpm lint
```

---

## 📈 Métricas & limites

- Rate limit: 30 req/s por IP
- Session expiry: 7 dias
- Upload max: 5 MB (JPG, PNG, WEBP)

---

## 🛠️ Troubleshooting (comuns)

- Port 5173 em uso: `pnpm dev -- --port 3000`
- Erro de módulo: `rm -rf node_modules pnpm-lock.yaml && pnpm install`
- Erro de conexão DB: verificar `.env` e se o Postgres está rodando
- Erros Gemini: conferir chave e formato de requisição

---

## 📋 Roadmap

- Testes (Jest, Pytest)
- CI/CD (GitHub Actions)
- TypeScript no frontend
- Docker + Docker Compose
- Migrate para SQLAlchemy / ORM
- Redis caching
- Paginação nas APIs

---

## 🤝 Contribuição

1. Fork
2. Branch: `git checkout -b feature/x`
3. Commit
4. Push
5. Pull Request

---

## 📄 Licença

MIT

---

## 📞 Contato

- Email: joaopedrooliveiradearaujo416@gmail.com
- Issues: https://github.com/joaopedro236/Pousa-/issues
- Demo: https://pousa.vercel.app

---

## 👨‍💻 Autor

**João Pedro Oliveira** — https://github.com/joaopedro236

---

<p align="center">Made with ❤️ using React, FastAPI and PostgreSQL</p>
