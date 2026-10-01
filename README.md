# PousaÊ

<div align="center">

![PousaÊ](https://img.shields.io/badge/Pousa%C3%8A-Travel%20Platform-2E86AB?style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-49.9%25-F7DF1E?style=flat-square&logo=javascript)
![Python](https://img.shields.io/badge/Python-29.6%25-3776AB?style=flat-square&logo=python)
![CSS](https://img.shields.io/badge/CSS-20.3%25-1572B6?style=flat-square&logo=css3)
![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=flat-square&logo=react)
![FastAPI](https://img.shields.io/badge/FastAPI-API-009688?style=flat-square&logo=fastapi)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=flat-square&logo=postgresql)

</div>

Plataforma moderna para descobrir, reservar e gerenciar experiências de viagem e hospedagens.

PousaÊ é uma aplicação full-stack desenvolvida com React no frontend e FastAPI no backend, com PostgreSQL como banco de dados principal. A plataforma permite que usuários explorem destinos, visualizem detalhes das viagens, comprem experiências, gerenciem favoritos, comentários, saldo e perfil pessoal.

## Demo em produção

- Site: https://pousa.vercel.app
- Repositório: https://github.com/joaopedro236/Pousa-

## Visão geral

A aplicação foi pensada para oferecer uma experiência de compra e descoberta de hospedagens/experiências de viagem com foco em:

- autenticação segura
- gestão de usuários
- compra e histórico de viagens
- interação com IA para suporte e moderação
- interface responsiva e moderna

## Stack tecnológica

### Frontend

- React
- Vite
- JavaScript
- HTML
- CSS
- Bootstrap
- React Router
- React Day Picker
- Recharts
- React Cookie

### Backend

- Python
- FastAPI
- Pydantic
- PostgreSQL
- psycopg2
- Argon2
- python-dotenv

### Serviços e integrações

- Gemini AI para chatbot e moderação
- ImgBB para upload e hospedagem de imagens
- Vercel para deploy

## Funcionalidades principais

- Cadastro e login de usuários
- Validação de dados de autenticação
- Sessões com cookies HTTP-only
- Perfil do usuário com saldo e histórico
- Listagem de viagens com busca e filtros
- Visualização detalhada da viagem
- Compra de experiências com validação de saldo
- Sistema de favoritos
- Comentários e avaliações
- Moderação automática de comentários com IA
- Assistente virtual inteligente
- Proteção contra compras próprias e inconsistências de saldo

## Estrutura do projeto

```bash
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
├── previews/
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
├── README.md
└── README.md
```

## Pré-requisitos

Antes de iniciar, verifique se você possui instalado:

- Node.js 18+
- pnpm
- Python 3.10+
- PostgreSQL
- Git
- VS Code (recomendado)

## Configuração local

### 1) Clone o repositório

```bash
git clone https://github.com/joaopedro236/Pousa-.git
cd Pousa-
```

### 2) Instale as dependências do frontend

```bash
pnpm install
```

### 3) Inicie o frontend

```bash
pnpm dev
```

A aplicação estará disponível em:

```bash
http://localhost:5173
```

### 4) Configure o backend

```bash
cd API
python -m venv .venv
```

Para Windows:

```bash
.venv\Scripts\activate
```

Para macOS/Linux:

```bash
source .venv/bin/activate
```

Em seguida:

```bash
pip install -r requirements.txt
```

Inicie a API:

```bash
uvicorn main:app --reload
```

A documentação Swagger estará disponível em:

```bash
http://localhost:8000/docs
```

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base no exemplo disponível em `.env.example`.

Exemplo:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pousa_users
DB_USER=postgres
DB_PASSWORD=sua_senha

DB_HOST_TRIP=localhost
DB_PORT_TRIP=5432
DB_NAME_TRIP=pousa_trips
DB_USER_TRIP=postgres
DB_PASSWORD_TRIP=sua_senha

VITE_API_URL=http://localhost:8000
FRONTEND_URLS=http://localhost:5173,http://localhost:3000
IMGBB_URL=sua_chave_imgbb
GEMINI_API_KEY=sua_chave_gemini
```

## Scripts disponíveis

No frontend, os scripts principais são:

```bash
pnpm dev
pnpm build
pnpm preview
pnpm lint
```

## Fluxos principais

### Autenticação

```text
Usuário -> Cadastro/Login -> Valida��ão -> Hash de senha -> Banco de dados -> Token de sessão -> Cookie HTTP-only
```

### Compra de viagem

```text
Usuário seleciona viagem -> Verifica autenticação -> Valida saldo -> Atualiza banco -> Confirma compra
```

### Comentários e moderação

```text
Comentário -> Validação -> IA Gemini -> Aprovação/Rejeição -> Persistência -> Exibição para usuários
```

## Segurança e boas práticas

- cookies HTTP-only para autenticação
- senhas com hash seguro via Argon2
- proteção contra compra própria
- validação de sessão do usuário
- moderação automática de comentários
- rate limiting no backend
- CORS configurado para ambientes autorizados

## Contribuição

Contribuições são bem-vindas.

1. Faça um fork do projeto
2. Crie uma branch para sua funcionalidade
3. Faça o commit das alterações
4. Envie para o repositório
5. Abra um Pull Request

## Licença

Este projeto está disponível sob a licença MIT.

## Contato

- GitHub: https://github.com/joaopedro236
- Issues: https://github.com/joaopedro236/Pousa-/issues
- E-mail: joaopedrooliveiradearaujo416@gmail.com

## Agradecimentos

- React
- FastAPI
- PostgreSQL
- Bootstrap
- Gemini AI
- ImgBB

## Status do projeto

O projeto está em desenvolvimento ativo e com deploy em produção na Vercel, com frontend funcional e backend em operação.

<p align="center">
  <strong>Made with ❤️ by João Pedro Oliveira</strong>
</p>
