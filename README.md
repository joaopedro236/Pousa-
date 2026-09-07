# 🏨 PousaÊ

> A web application for discovering and creating trips.

**PousaÊ** is a full-stack web application built with **React** and **FastAPI**, with **PostgreSQL** used for data persistence.

The application provides user authentication, trip creation and discovery, user dashboards, profile image uploads and trip purchasing functionality.

---

## 🖥️ Technologies

<p align="center">
  <img src="https://skillicons.dev/icons?i=python,fastapi,postgres,html,css,bootstrap,js,react,vite,git,github,vscode" />
</p>

### Frontend

* React
* React DOM
* Vite
* JavaScript
* HTML
* CSS
* Bootstrap
* React Day Picker

### Backend

* Python
* FastAPI
* Pydantic
* PostgreSQL
* psycopg2
* python-dotenv
* Argon2

### APIs & Libraries

* ImgBB API
* Requests

### Development

* VS Code
* pnpm
* Git
* GitHub

---

## 📸 Preview

<p align="center">
  <img src="./banner.jpeg" alt="PousaÊ preview" width="900">
</p>

---

# ✨ Features

## 👤 User

* User registration
* User login
* User authentication
* HTTP-only authentication cookie
* User profile
* Profile image upload
* User balance
* Trips taken information
* Money spent information

## 🗺️ Trips

* Create trips
* View available trips
* View trip information
* Trip description
* Start and end dates
* Number of travelers
* Pet allowance
* Trip price
* Trip owner information
* Trip owner profile image
* Trip reviews
* Purchase trips

## 💰 Trip Purchase

The purchase flow performs validations before completing a purchase.

The backend checks:

* Whether the user is authenticated
* Whether the trip exists
* Whether the user has enough balance
* Whether the user is trying to purchase their own trip

After a successful purchase, the application updates the corresponding user and trip information.

---

# 🔐 Authentication

Authentication is handled by the FastAPI backend.

After authentication, the application generates a UUID session token and stores it in an **HTTP-only cookie**.

The cookie uses:

* `HttpOnly`
* `SameSite=Lax`
* 7-day maximum age

The backend also provides an endpoint for checking the current user session.

---

# 🖼️ Profile Images

Users can upload profile images through the application.

The backend validates the uploaded file and supports:

* JPG
* PNG
* WEBP

The maximum upload size is **5 MB**.

Images are uploaded to **ImgBB**, and the resulting URL is associated with the user's profile.

---

# 🔌 API

The backend is built with **FastAPI**.

## User Routes

| Method | Endpoint        | Description                             |
| :----: | --------------- | --------------------------------------- |
| `POST` | `/registerUser` | Register a user                         |
| `POST` | `/login`        | Authenticate a user                     |
|  `GET` | `/checkUser`    | Check the current session               |
|  `GET` | `/getUser`      | Retrieve authenticated user information |
| `POST` | `/upload-image` | Upload a profile image                  |

## Trip Routes

| Method | Endpoint    | Description              |
| :----: | ----------- | ------------------------ |
| `POST` | `/trips`    | Create a trip            |
|  `GET` | `/getTrips` | Retrieve available trips |
| `POST` | `/buyTrip`  | Purchase a trip          |

---

# 🏗️ Architecture

PousaÊ is divided into a frontend and a backend.

```text
                    ┌─────────────────────┐
                    │      React + Vite   │
                    │       Frontend      │
                    └──────────┬──────────┘
                               │
                          HTTP Requests
                               │
                               ▼
                    ┌─────────────────────┐
                    │       FastAPI       │
                    │       Backend       │
                    └──────────┬──────────┘
                               │
                               │ psycopg2
                               ▼
                    ┌─────────────────────┐
                    │     PostgreSQL      │
                    │      Database       │
                    └─────────────────────┘
```

The frontend is responsible for the user interface and interaction, while the backend handles validation, authentication, application logic and database operations.

---

# 📂 Project Structure

## Backend

```text
API/
├── Databases/
│   ├── Conn/
│   │   ├── trips.py
│   │   └── users.py
│   │
│   └── DB/
│       ├── trips.py
│       └── users.py
│
├── Routers/
│   ├── Trips/
│   │   ├── buyTrip.py
│   │   ├── get_trips.py
│   │   └── trips.py
│   │
│   └── User/
│       ├── get_user.py
│       ├── login.py
│       ├── registerUser.py
│       └── updateImage.py
│
├── SQL/
│   ├── trips.py
│   └── usersDB.py
│
├── Validation/
│   ├── Trip/
│   │   ├── buyTrip.py
│   │   └── trips.py
│   │
│   └── User/
│       ├── checkUser.py
│       ├── login.py
│       └── registerUser.py
│
└── main.py
```

## Frontend

```text
src/
├── Components/
│   ├── Home/
│   │   ├── Home.jsx
│   │   ├── home.css
│   │   └── components/
│   │       ├── TripsActive.jsx
│   │       └── tripsActive.css
│   │
│   ├── Login/
│   │   ├── Login.jsx
│   │   ├── inputs.js
│   │   └── login.css
│   │
│   ├── Navbar/
│   │   ├── Navbar.jsx
│   │   └── Navbar.css
│   │
│   ├── RegisterUser/
│   │   ├── RegisterUser.jsx
│   │   ├── RegisterUser.css
│   │   └── inputs.js
│   │
│   ├── UserDashboard/
│   │   ├── UserDashboard.jsx
│   │   ├── cardsUsers.js
│   │   └── userDashboard.css
│   │
│   ├── createTrip/
│   │   ├── CreateTrip.jsx
│   │   ├── CreateTrip.css
│   │   └── inputs.js
│   │
│   └── loading/
│       ├── Loading.jsx
│       └── Loading.css
│
├── StylesGlobals/
│   ├── assets.css
│   ├── reset.css
│   └── root.css
│
├── assets/
│
├── App.jsx
└── main.jsx
```

---

# 🗄️ Database

The project uses **PostgreSQL** as its database.

Database communication is handled through **psycopg2**.

The backend separates database connection and database operations into dedicated modules for users and trips.

---

# 🛡️ Password Security

Passwords are hashed using **Argon2** before being stored.

The application therefore does not need to store users' passwords as plain text.

---

# 🚦 Rate Limiting

The FastAPI application includes an in-memory rate-limiting middleware.

The current implementation limits requests by IP address to:

```text
50 requests per second
```

Requests exceeding the configured limit receive:

```text
HTTP 429
```

---

# 🌐 CORS

The backend uses FastAPI's `CORSMiddleware` to handle cross-origin requests between the frontend and backend during development.

---

# 🚀 Getting Started

## Requirements

Before running the project, make sure you have installed:

* Node.js
* pnpm
* Python
* PostgreSQL
* Visual Studio Code

---

## 1. Clone the repository

```bash
git clone https://github.com/joaopedro236/Pousa-.git

cd Pousa-
```

---

## 2. Install frontend dependencies

Using **pnpm**:

```bash
pnpm install
```

---

## 3. Start the frontend

```bash
pnpm dev
```

Vite will start the development server and provide the local URL in the terminal.

---

## 4. Backend

Create a Python virtual environment:

```bash
python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

Install the Python packages required by the backend.

The backend configuration should be created using the project's existing environment example.

---

## 5. Start FastAPI

Run the backend using the project's `API/main.py` entry point.

The frontend and backend should be running simultaneously during development.

---

# 📦 Package Scripts

The frontend currently provides these scripts:

| Command        | Description                       |
| -------------- | --------------------------------- |
| `pnpm dev`     | Start the Vite development server |
| `pnpm build`   | Build the frontend                |
| `pnpm preview` | Preview the production build      |
| `pnpm lint`    | Run Oxlint                        |

---

# 🔄 Application Flow

### Authentication

```text
Register
   │
   ▼
FastAPI
   │
   ▼
Validate user
   │
   ▼
Hash password
   │
   ▼
PostgreSQL
   │
   ▼
Create session cookie
```

### Creating a Trip

```text
User
 │
 ▼
Create Trip
 │
 ▼
React
 │
 ▼
POST /trips
 │
 ▼
FastAPI
 │
 ▼
Validation
 │
 ▼
PostgreSQL
```

### Purchasing a Trip

```text
User
 │
 ▼
Select Trip
 │
 ▼
Purchase
 │
 ▼
POST /buyTrip
 │
 ▼
Validate session
 │
 ▼
Validate trip
 │
 ▼
Check balance
 │
 ▼
Process purchase
 │
 ▼
Update database
```

---

# 🧰 Development Environment

The project is developed using:

<p align="center">
  <img src="https://skillicons.dev/icons?i=vscode,git,github,pnpm" />
</p>

* **Visual Studio Code** as the main code editor
* **pnpm** for frontend package management
* **Git** for version control
* **GitHub** for repository hosting

---

# 📌 Project Status

PousaÊ is currently under development.

The repository contains the implemented frontend and backend functionality for users, authentication, trips, profile images, trip purchasing and the associated PostgreSQL data layer.

---

# 👨‍💻 Author

**João Pedro Oliveira**

[![GitHub](https://img.shields.io/badge/GitHub-joaopedro236-181717?style=for-the-badge\&logo=github)](https://github.com/joaopedro236)

---

<p align="center">
  Made with React, FastAPI and PostgreSQL.
</p>
