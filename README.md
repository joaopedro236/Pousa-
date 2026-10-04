# 🏨 PousaÊ

> A modern platform to discover, book, and manage travel experiences.

**PousaÊ** is a full-stack application built with React (frontend) and FastAPI (backend), with PostgreSQL for persistence. The goal is to offer travel discovery, profile management, secure booking, favorites, reviews, and AI-powered chat support.

---

<div align="center">

![Demo](https://img.shields.io/badge/Live-pousa.vercel.app-00b894?style=for-the-badge&logo=vercel)

<p>
  <img src="https://skillicons.dev/icons?i=python,fastapi,postgres,html,css,bootstrap,js,react,vite,git,github,vscode" alt="tech icons" />
</p>

<p>
  ![JavaScript](https://img.shields.io/badge/JavaScript-50.1%25-F7DF1E?style=flat-square&logo=javascript)
  ![Python](https://img.shields.io/badge/Python-29.4%25-3776AB?style=flat-square&logo=python)
  ![CSS](https://img.shields.io/badge/CSS-20.3%25-1572B6?style=flat-square&logo=css3)
  ![HTML](https://img.shields.io/badge/HTML-0.2%25-E34F26?style=flat-square&logo=html5)
</p>

</div>

---

## 📊 Project Status

| Aspect | Status |
|---|---:|
| **Overall Rating** | 8.5 / 10 ⭐ |
| **Frontend** | ✅ Functional |
| **Backend** | ✅ Operational |
| **Database** | ✅ PostgreSQL Configured |
| **Deployment** | ✅ Vercel (Frontend) |

---

## 🖥️ Technologies (Summary)

- **Frontend:** React, Vite, JavaScript, HTML, CSS, Bootstrap
- **Backend:** Python, FastAPI, Pydantic
- **Database:** PostgreSQL (psycopg2)
- **Authentication:** HTTP-only cookies + UUID tokens
- **AI:** Gemini (chatbot + moderation)
- **Image Upload:** ImgBB
- **Deploy:** Vercel

---

## ✨ Main Features

- User registration and login (email validation, CPF, password)
- Secure sessions with HTTP-only cookies
- User profile with image, balance, and history
- Trip listing, search, and filters
- Detailed trip view (dates, price, traveler limit, pet policy)
- Trip purchase with balance verification and self-purchase protection
- Favorites system (star/bookmark)
- Comments and ratings with automatic moderation (Gemini AI)
- Virtual assistant with AI

---

## 🔐 Security & Best Practices

- Passwords stored with Argon2 (secure hashing)
- Cookies: HttpOnly, Secure (in production), SameSite configured
- Rate limiting (IP-based) configured in backend
- CORS configured with exposed headers when necessary
- Automatic comment moderation (hate speech and inappropriate content detection)

---

## 🔌 Main Endpoints (Summary)

**User:**
```
POST   /registerUser    - Register user
POST   /login           - Authenticate user
GET    /checkUser       - Verify session
GET    /getUser         - Get authenticated user data
POST   /upload-image    - Upload profile image
```

**Trips & Purchase:**
```
POST   /trips           - Create new trip
GET    /getTrips        - List trips
POST   /buyTrip         - Buy trip
POST   /addStar         - Add to favorites
POST   /removeStar      - Remove from favorites
GET    /getStar         - List favorites
```

**Comments & AI:**
```
POST   /createComment   - Create comment (automatic moderation)
POST   /getComment      - Get comments
POST   /chatbot         - Chat with AI assistant
```

---

## 🏗️ Architecture (Quick Overview)

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

## 📂 Repository Structure

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
├── previews/          # Project images and screenshots
│   ├── screenshot_08.png
│   ├── screenshot_09.png
│   ├── screenshot_11.png
│   ├── screenshot_12.png
│   ├── screenshot_14.png
│   ├── screenshot_15.png
│   ├── screenshot_16.png
│   └── screenshot_17.png
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

## 📸 Project Screenshots

<details>
  <summary>Click to see project images</summary>

### Home & Trip Discovery
![Screenshot 08](https://raw.githubusercontent.com/joaopedro236/Pousa-/main/previews/screenshot_08.png)

### Trip Details
![Screenshot 09](https://raw.githubusercontent.com/joaopedro236/Pousa-/main/previews/screenshot_09.png)

### User Dashboard
![Screenshot 11](https://raw.githubusercontent.com/joaopedro236/Pousa-/main/previews/screenshot_11.png)

### Booking Interface
![Screenshot 12](https://raw.githubusercontent.com/joaopedro236/Pousa-/main/previews/screenshot_12.png)

### Favorites & Reviews
![Screenshot 14](https://raw.githubusercontent.com/joaopedro236/Pousa-/main/previews/screenshot_14.png)

### User Profile
![Screenshot 15](https://raw.githubusercontent.com/joaopedro236/Pousa-/main/previews/screenshot_15.png)

### Trip History
![Screenshot 16](https://raw.githubusercontent.com/joaopedro236/Pousa-/main/previews/screenshot_16.png)

### AI Chat Assistant
![Screenshot 17](https://raw.githubusercontent.com/joaopedro236/Pousa-/main/previews/screenshot_17.png)

</details>

---

## 🗄️ Database Schema (Summary)

**Users (`usersPousae`):**
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

**Trips:**
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

## 🚀 How to Run Locally

**Prerequisites:**
- Node.js 18+ and pnpm
- Python 3.10+
- PostgreSQL

**Quick Steps:**

1. **Clone**
```bash
git clone https://github.com/joaopedro236/Pousa-.git
cd Pousa-
```

2. **Frontend**
```bash
pnpm install
pnpm dev
# app: http://localhost:5173
```

3. **Backend**
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

4. **Database**
- Use `.env.example` as reference and create your databases in PostgreSQL

---

## 🔧 Environment Variables (Example)

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

## 📦 Frontend Scripts

```bash
pnpm dev       # Start development server
pnpm build     # Build for production
pnpm preview   # Preview production build
pnpm lint      # Run linter
```

---

## 📈 Metrics & Limits

- **Rate limit:** 30 req/s per IP
- **Session expiry:** 7 days
- **Upload max:** 5 MB (JPG, PNG, WEBP)

---

## 🛠️ Troubleshooting (Common Issues)

- **Port 5173 in use:** `pnpm dev -- --port 3000`
- **Module error:** `rm -rf node_modules pnpm-lock.yaml && pnpm install`
- **DB connection error:** Check `.env` and ensure PostgreSQL is running
- **Gemini errors:** Verify API key and request format

---

## 📋 Roadmap

- Tests (Jest, Pytest)
- CI/CD (GitHub Actions)
- TypeScript in frontend
- Docker + Docker Compose
- Migration to SQLAlchemy / ORM
- Redis caching
- API pagination

---

## 🤝 Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/x`
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

## 📄 License

MIT

---

## 📞 Contact

- **Email:** joaopedrooliveiradearaujo416@gmail.com
- **Issues:** https://github.com/joaopedro236/Pousa-/issues
- **Live Demo:** https://pousa.vercel.app

---

## 👨‍💻 Author

**João Pedro Oliveira** — https://github.com/joaopedro236

---

<p align="center">Made with ❤️ using React, FastAPI and PostgreSQL</p>
