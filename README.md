# 🏨 PousaÊ

> A modern web application for discovering and booking travel accommodations.

**PousaÊ** is a full-stack web application built with **React** and **FastAPI**, using **PostgreSQL** for data persistence. It enables users to discover, create, and purchase travel experiences with a seamless, intuitive interface.

**🌐 Live Demo:** [pousa.vercel.app](https://pousa.vercel.app)

---

## 📊 Project Status

| Aspect | Status |
|--------|--------|
| **Overall Grade** | 7.5/10 ⭐ |
| **Frontend** | ✅ Fully Functional |
| **Backend** | ✅ Fully Functional |
| **Database** | ✅ Fully Operational |
| **Deployment** | ✅ Live on Vercel |

---

## 🖥️ Technologies

<p align="center">
  <img src="https://skillicons.dev/icons?i=python,fastapi,postgres,html,css,bootstrap,js,react,vite,git,github,vscode" />
</p>

### Frontend Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 19.2.8 | UI framework |
| **Vite** | 8.2.0 | Build tool & dev server |
| **Bootstrap** | 5.3.8 | Styling & components |
| **React Router** | 7.18.3 | Client-side routing |
| **React Day Picker** | 10.0.1 | Date selection |
| **Oxlint** | 1.75.0 | Code linting |

### Backend Stack

| Technology | Purpose |
|------------|---------|
| **Python 3.x** | Core language |
| **FastAPI** | Web framework |
| **Pydantic** | Data validation |
| **PostgreSQL** | Database |
| **psycopg2** | DB adapter |
| **Argon2** | Password hashing |
| **python-dotenv** | Environment variables |

### External APIs & Services

| Service | Purpose |
|---------|---------|
| **Gemini AI** | Chatbot & content moderation |
| **ImgBB** | Image hosting & CDN |

---

## ✨ Features

### 👤 User Management
- ✅ User registration with email validation
- ✅ Secure login with session tokens
- ✅ HTTP-only authentication cookies (7-day expiry)
- ✅ User profile with customizable image
- ✅ Account balance tracking
- ✅ Trip history and spending analytics
- ✅ AI-powered chatbot assistant

### 🗺️ Trip Management
- ✅ Create and publish trips with rich details
- ✅ Browse all available trips with search/filter
- ✅ Trip details: dates, price, traveler count, pet policy
- ✅ Owner information and profile images
- ✅ Ratings and review system
- ✅ Favorite trips (star/bookmark feature)
- ✅ User comments with AI moderation

### 💰 Trip Booking System
- ✅ Secure trip purchase flow
- ✅ Balance validation before purchase
- ✅ Prevent self-purchase protection
- ✅ Automatic balance and trip count updates
- ✅ Purchase history tracking

### 🤖 AI Features
- ✅ **Chatbot**: Context-aware travel assistant
- ✅ **Content Moderation**: Automatic comment review
- ✅ **Smart Recommendations**: Based on trip context

---

## 🔐 Security Features

### Authentication & Authorization
- **Session Tokens**: UUID-based, HTTP-only cookies
- **Cookie Settings**: 
  - `HttpOnly` ✅ (prevents XSS)
  - `SameSite=None` ✅ (CSRF protection)
  - `Secure=True` ✅ (HTTPS only in production)
  - **7-day expiry** ✅

### Password Security
- **Argon2 Hashing**: Industry-standard password hashing
- **No Plain Text**: Passwords never stored unencrypted
- **Strong Defaults**: Memory-hard hashing function

### Rate Limiting
- **IP-based Rate Limiting**: 30 requests/second per IP
- **HTTP 429 Response**: On limit exceeded
- **In-memory Tracking**: Efficient rate limit management

### CORS & Cross-Origin
- **FastAPI CORSMiddleware**: Properly configured
- **Exposed Headers**: Set-Cookie header exposed
- **Credential Support**: Enabled for secure requests

### Content Moderation
- **Gemini AI Moderation**: All user comments reviewed
- **Hate Speech Detection**: Automatic flagging
- **Context Awareness**: Travel-focused moderation rules

---

## 🔌 API Endpoints

### User Management Routes

```
POST   /registerUser    - Register new user
POST   /login           - Authenticate user
GET    /checkUser       - Verify session validity
GET    /getUser         - Get authenticated user data
POST   /upload-image    - Upload profile picture
```

### Trip Management Routes

```
POST   /trips           - Create new trip
GET    /getTrips        - Fetch all available trips
POST   /buyTrip         - Purchase a trip
POST   /addStar         - Add trip to favorites
POST   /removeStar      - Remove from favorites
GET    /getStar         - Get favorite trips list
POST   /createComment   - Add trip review/comment
POST   /getComment      - Fetch trip comments
```

### AI Features

```
POST   /chatbot         - Chat with travel assistant
```

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│         Frontend (React + Vite)         │
│  - Components: Home, Trips, Dashboard   │
│  - State: React Hooks                   │
│  - Styling: Bootstrap + Custom CSS      │
└──────────────────┬──────────────────────┘
                   │
                   │ REST API (HTTP/HTTPS)
                   │
┌──────────────────▼──────────────────────┐
│       Backend (FastAPI + Python)        │
│  ├─ Routers: User, Trips, Comments     │
│  ├─ Validation: Pydantic Models        │
│  ├─ Middleware: Rate Limiting, CORS    │
│  └─ Integrations: Gemini, ImgBB        │
└──────────────────┬──────────────────────┘
                   │
                   │ psycopg2 Connection
                   │
┌──────────────────▼──────────────────────┐
│      Database (PostgreSQL)              │
│  ├─ Tables: users, trips, comments      │
│  ├─ Arrays: star[], comments[], notes[] │
│  └─ Indexes: Standard B-tree indices    │
└─────────────────────────────────────────┘
```

### Data Flow

**Authentication Flow:**
```
User Input → Validation → Hash Password → PostgreSQL → Session Token → HTTP-only Cookie
```

**Trip Purchase Flow:**
```
Select Trip → Validate Session → Check Balance → Update Tables → Confirm Purchase
```

**Comment Flow:**
```
User Comment → Gemini Moderation → Content Review → Save to DB → Display with User Info
```

---

## 📂 Project Structure

### Backend Organization

```
API/
├── main.py                          # FastAPI app entry point
├── Databases/
│   ├── Conn/
│   │   ├── users.py                # User DB connection
│   │   └── trips.py                # Trips DB connection
│   └── DB/
│       ├── users.py                # User table initialization
│       └── trips.py                # Trips table initialization
├── Routers/
│   ├── User/
│   │   ├── registerUser.py         # Registration endpoint
│   │   ├── login.py                # Login endpoint
│   │   ├── get_user.py             # Get user info
│   │   └── updateImage.py          # Profile image upload
│   ├── Trips/
│   │   ├── trips.py                # Create trips
│   │   ├── get_trips.py            # Fetch all trips
│   │   ├── buyTrip.py              # Purchase trips
│   │   └── Star/
│   │       ├── addStar.py          # Add to favorites
│   │       ├── removeStar.py       # Remove from favorites
│   │       └── getStar.py          # Get favorites
│   ├── Comments/
│   │   ├── comments.py             # Create comments
│   │   └── getComments.py          # Fetch comments
│   └── Chatbot/
│       └── chatbot.py              # AI chatbot endpoint
├── Validation/
│   ├── User/
│   │   ├── registerUser.py         # Registration validation
│   │   ├── login.py                # Login validation
│   │   └── checkUser.py            # Session validation
│   ├── Trip/
│   │   ├── trips.py                # Trip creation validation
│   │   └── buyTrip.py              # Purchase validation
│   ├── Comments/
│   │   ├── comments.py             # Comment validation
│   │   └── get_comments.py         # Query validation
│   └── Chatbot/
│       └── chatbot.py              # Chatbot input validation
└── SQL/
    ├── trips.py                     # Trip queries
    └── usersDB.py                   # User queries
```

### Frontend Organization

```
src/
├── App.jsx                          # Main application component
├── main.jsx                         # React entry point
├── Components/
│   ├── Home/
│   │   ├── Home.jsx                # Main feed & trip listing
│   │   ├── home.css                # Styling
│   │   └── components/
│   │       ├── TripsActive.jsx     # Trip detail view
│   │       └── tripsActive.css     # Styling
│   ├── Login/
│   │   ├── Login.jsx               # Login modal
│   │   ├── login.css               # Styling
│   │   └── inputs.js               # Form config
│   ├── RegisterUser/
│   │   ├── RegisterUser.jsx        # Registration modal
│   │   ├── RegisterUser.css        # Styling
│   │   └── inputs.js               # Form config
│   ├── Navbar/
│   │   ├── Navbar.jsx              # Navigation component
│   │   └── Navbar.css              # Styling
│   ├── UserDashboard/
│   │   ├── UserDashboard.jsx       # User profile & stats
│   │   ├── userDashboard.css       # Styling
│   │   └── cardsUsers.js           # Dashboard cards config
│   ├── CreateTrip/
│   │   ├── CreateTrip.jsx          # Trip creation form
│   │   ├── CreateTrip.css          # Styling
│   │   └── inputs.js               # Form field config
│   ├── Stars/
│   │   ├── Stars.jsx               # Favorites view
│   │   └── star.css                # Styling
│   ├── Chatbot/
│   │   ├── Chatbot.jsx             # AI assistant interface
│   │   └── Chatbot.css             # Styling
│   └── loading/
│       ├── Loading.jsx             # Loading spinner
│       └── Loading.css             # Styling
├── StylesGlobals/
│   ├── reset.css                   # CSS reset
│   ├── assets.css                  # Global utilities
│   ├── root.css                    # CSS variables
│   └── fonts.css                   # Font imports
└── assets/
    └── [images & icons]
```

---

## 🗄️ Database Schema

### Users Table (`usersPousae`)
```sql
id              SERIAL PRIMARY KEY
name            VARCHAR(150) NOT NULL
email           VARCHAR(254) NOT NULL
password        VARCHAR(255) NOT NULL (Argon2 hashed)
session_token   UUID UNIQUE
cpf             VARCHAR(14) NOT NULL
money           NUMERIC(10,2) DEFAULT 1000.00
image_url       TEXT (ImgBB URL)
moneyalreadyspent NUMERIC(10,2) DEFAULT 0.0
tripsTaken      INTEGER DEFAULT 0
star            INT[] (favorite trip IDs)
comments        INT[] (commented trip IDs)
```

### Trips Table
```sql
id              SERIAL PRIMARY KEY
name            VARCHAR NOT NULL
description     TEXT NOT NULL
startDate       DATE NOT NULL
endDate         DATE NOT NULL
numberOfTravelers INT NOT NULL
petsAllowed     BOOLEAN
price           NUMERIC(10,2) NOT NULL
session_token   UUID (owner reference)
review          FLOAT DEFAULT 0
usersPurchased  UUID[] (purchase history)
comments        TEXT[] (comment content)
usersComments   UUID[] (commenters)
notes           INT[] (comment ratings)
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v16+ and **pnpm** (frontend)
- **Python** 3.8+ and **pip** (backend)
- **PostgreSQL** 12+ (database)
- **Git** (version control)
- **VS Code** (recommended editor)

### Quick Start (Local Development)

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/joaopedro236/Pousa-.git
cd Pousa-
```

#### 2️⃣ Frontend Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
# Opens at http://localhost:5173
```

#### 3️⃣ Backend Setup

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your configuration:
# - Database credentials
# - Gemini API key
# - ImgBB API key
# - Frontend URLs for CORS

# Start FastAPI server
uvicorn API.main:app --reload
# Runs at http://localhost:8000
# Docs at http://localhost:8000/docs
```

#### 4️⃣ Database Setup

```bash
# PostgreSQL should create tables automatically on app start
# But you can manually create with:
psql -U your_user -d your_db < database_schema.sql
```

---

## 📦 NPM Scripts

```bash
pnpm dev        # Start Vite dev server (port 5173)
pnpm build      # Build for production
pnpm preview    # Preview production build locally
pnpm lint       # Run Oxlint code quality check
```

---

## 🔧 Environment Variables

Create a `.env` file in the project root:

```env
# Database - Users
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pousa_users
DB_USER=postgres
DB_PASSWORD=your_password

# Database - Trips
DB_HOST_TRIP=localhost
DB_PORT_TRIP=5432
DB_NAME_TRIP=pousa_trips
DB_USER_TRIP=postgres
DB_PASSWORD_TRIP=your_password

# Frontend
VITE_API_URL=http://localhost:8000
FRONTEND_URLS=http://localhost:5173,http://localhost:3000

# External APIs
GEMINI_API_KEY=your_gemini_key
IMGBB_URL=your_imgbb_api_key
```

---

## 📈 Performance Metrics

| Metric | Value | Status |
|--------|-------|--------|
| **Rate Limit** | 30 req/s per IP | ✅ Active |
| **Session Expiry** | 7 days | ✅ Secure |
| **Password Hash** | Argon2 | ✅ Secure |
| **Image Size Limit** | 5 MB | ✅ Validated |
| **Supported Formats** | JPG, PNG, WEBP | ✅ Active |

---

## 🔄 Application Flows

### User Authentication
```
Register/Login
    ↓
Validation (Email, CPF, Password)
    ↓
Hash Password (Argon2)
    ↓
Save to PostgreSQL
    ↓
Generate UUID Session Token
    ↓
Set HTTP-only Cookie (7 days)
    ↓
Redirect to Dashboard
```

### Trip Creation
```
User Input
    ↓
Frontend Validation
    ↓
POST /trips
    ↓
Backend Validation (Pydantic)
    ↓
Content Moderation (Gemini)
    ↓
Save to PostgreSQL
    ↓
Success Response
```

### Trip Purchase
```
User Clicks Purchase
    ↓
Verify Authentication (Session Token)
    ↓
Verify Trip Exists
    ↓
Check User Balance
    ↓
Verify Not Own Trip
    ↓
Deduct Balance (Buyer)
    ↓
Add Revenue (Owner)
    ↓
Increment Trip Counter
    ↓
Update PostgreSQL
    ↓
Purchase Confirmation
```

### Comments with Moderation
```
User Submits Comment
    ↓
Verify Trip Completed
    ↓
Check Duplicate Comment
    ↓
Send to Gemini AI
    ↓
Moderation Analysis
    ↓
If SAFE → Save to DB
    ↓
If BLOCK → Reject with message
    ↓
Display Comments with User Info
```

---

## 🤔 Troubleshooting

### Frontend Issues

**Port 5173 already in use:**
```bash
pnpm dev -- --port 3000
```

**Module not found errors:**
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Backend Issues

**Database connection failed:**
- Verify PostgreSQL is running
- Check `.env` credentials
- Ensure databases exist

**Gemini API errors:**
- Verify API key is valid
- Check API quota/limits
- Review request format

**CORS errors:**
- Verify `FRONTEND_URLS` in `.env`
- Check `expose_headers` in FastAPI
- Verify `SameSite` cookie settings

---

## 📋 Roadmap & Future Improvements

### Planned Features
- 🔄 Add unit & integration tests (Jest, Pytest)
- 🔄 Implement CI/CD pipeline (GitHub Actions)
- 🔄 Add TypeScript support for type safety
- 🔄 Dockerize application (Docker Compose)
- 🔄 Migrate to SQLAlchemy ORM
- 🔄 Add API pagination (getTrips endpoint)
- 🔄 Implement Redis caching layer
- 🔄 Add Swagger/OpenAPI documentation
- 🔄 Structured logging system
- 🔄 Database query optimization & indexing

### Quality Improvements
- 📈 Increase code coverage to 80%+
- 📈 Add pre-commit hooks
- 📈 Implement error boundary components
- 📈 Add E2E tests (Cypress/Playwright)
- 📈 Performance optimization (bundle size)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 📞 Support & Contact

For issues, questions, or suggestions:

- 📧 Email: joaopedrooliveiradearaujo416@gmail.com
- 🐛 GitHub Issues: [Report an Issue](https://github.com/joaopedro236/Pousa-/issues)
- 💬 Discussions: [Start a Discussion](https://github.com/joaopedro236/Pousa-/discussions)

---

## 👨‍💻 Author

**João Pedro Oliveira**

[![GitHub](https://img.shields.io/badge/GitHub-joaopedro236-181717?style=for-the-badge&logo=github)](https://github.com/joaopedro236)
[![Email](https://img.shields.io/badge/Email-joaopedrooliveiradearaujo416@gmail.com-red?style=for-the-badge&logo=gmail)](mailto:joaopedrooliveiradearaujo416@gmail.com)

---

## 🙏 Acknowledgments

- **FastAPI** - Amazing Python web framework
- **React** - Excellent UI library
- **Bootstrap** - Great CSS framework
- **Gemini AI** - Powerful AI integration
- **ImgBB** - Reliable image hosting

---

<p align="center">
  <strong>Made with ❤️ using React, FastAPI, and PostgreSQL</strong>
</p>

<p align="center">
  <a href="https://pousa.vercel.app">🌐 Visit Live Demo</a> •
  <a href="https://github.com/joaopedro236/Pousa-">📚 Repository</a> •
  <a href="https://github.com/joaopedro236">👤 Profile</a>
</p>
