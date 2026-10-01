# PousaÊ

Plataforma moderna para descobrir, reservar e gerenciar experiências de viagem e hospedagens.

PousaÊ é uma aplicação full-stack desenvolvida com React no frontend e FastAPI no backend, com PostgreSQL como banco de dados principal. A aplicação permite que usuários naveguem por viagens, visualizem detalhes, comprem experiências, gerenciem favoritos, comentários e perfil pessoal.

## Demo

- Live: https://pousa.vercel.app
- Repositório: https://github.com/joaopedro236/Pousa-

## Stack

- Frontend: React, Vite, JavaScript, HTML, CSS, Bootstrap
- Backend: Python, FastAPI, Pydantic
- Banco de dados: PostgreSQL
- Autenticação: cookies HTTP-only + tokens UUID
- IA: Gemini para moderação e chatbot
- Storage de imagens: ImgBB
- Deploy: Vercel

## Principais funcionalidades

- Cadastro e login de usuários
- Perfil do usuário com saldo, histórico e imagem
- Listagem de viagens e filtros de busca
- Visualização detalhada de cada viagem
- Compra de experiências com validação de saldo
- Sistema de favoritos (star)
- Comentários e avaliações
- Assistente com IA para suporte ao usuário
- Moderação automática de comentários
- Segurança com autenticação e proteção de rotas

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
└── LICENSE (se aplicável)
```

## Requisitos

Antes de começar, confirme que você tem instalado:

- Node.js 18+ e pnpm
- Python 3.10+
- PostgreSQL
- Git
- VS Code (opcional, porém recomendado)

## Configuração local

### 1) Clone o repositório

```bash
git clone https://github.com/joaopedro236/Pousa-.git
cd Pousa-
```

### 2) Frontend

```bash
pnpm install
pnpm dev
```

A aplicação será iniciada em:

```bash
http://localhost:5173
```

### 3) Backend

```bash
cd API
python -m venv .venv
source .venv/bin/activate   # Linux/macOS
# ou .venv\Scripts\activate   # Windows
pip install -r requirements.txt
```

Inicie a API:

```bash
uvicorn main:app --reload
```

A documentação interativa do FastAPI estará disponível em:

```bash
http://localhost:8000/docs
```

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto ou use o exemplo disponível em `.env.example`.

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
IMGBB_URL=sua_chave
GEMINI_API_KEY=sua_chave
```

## Scripts

No frontend:

```bash
pnpm dev
pnpm build
pnpm preview
pnpm lint
```

## Fluxos principais

### Autenticação

```text
Usuário -> Cadastro/Login -> Validação -> Hash de senha -> Banco de dados -> Token de sessão -> Cookie HTTP-only
```

### Compra de viagem

```text
Usuário seleciona viagem -> Verifica autenticação -> Valida saldo -> Atualiza banco -> Confirma compra
```

### Comentários e moderação

```text
Comentário -> Validação -> IA Gemini -> Aprovação/Recusa -> Armazenamento -> Exibição para usuários
```

## Contribuição

Contribuições são bem-vindas. Para colaborar:

1. Faça um fork do projeto
2. Crie uma branch para sua feature: `git checkout -b feature/nova-funcionalidade`
3. Commit das alterações: `git commit -m "Adiciona nova funcionalidade"`
4. Envie para o repositório: `git push origin feature/nova-funcionalidade`
5. Abra um Pull Request

## Licença

Este projeto está disponível sob a licença MIT.

## Contato e suporte

- GitHub: https://github.com/joaopedro236
- Issues: https://github.com/joaopedro236/Pousa-/issues
- Email: joaopedrooliveiradearaujo416@gmail.com

## Agradecimentos

- React
- FastAPI
- PostgresSQL
- Bootstrap
- Gemini AI
- ImgBB

## Status do projeto

O projeto está em desenvolvimento e execução ativa, com frontend funcional, backend operacional e deploy em produção via Vercel.
