from fastapi import FastAPI, Request
from API.Databases.DB.trips import database as db_trips
from API.Databases.DB.users import database as db_registerUser
from API.Routers.User.registerUser import router as registerUser
from API.Validation.User.checkUser import router as checkUser
from API.Routers.User.get_user import router as getUser
from API.Routers.User.updateImage import router as updateImage
from API.Routers.Trips.trips import router as trips
from API.Routers.Trips.get_trips import router as get_trips
from API.Routers.User.login import router as login
from API.Routers.Trips.buyTrip import router as buyTrip
from fastapi.responses import JSONResponse
import time
from collections import defaultdict
import os
from dotenv import load_dotenv

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

load_dotenv()


requests_by_ip = defaultdict(list)


@app.middleware("http")
async def rate_limit_middleware(request: Request, call_next):
    ip = request.client.host
    now = time.time()

    requests_by_ip[ip] = [t for t in requests_by_ip[ip] if now - t < 1]

    if len(requests_by_ip[ip]) >= 50:
        return JSONResponse(
            status_code=429,
            content={"message": "Limit of 50 requests/second exceeded"},
        )

    requests_by_ip[ip].append(now)

    return await call_next(request)


origins = os.getenv("FRONTEND_URLS").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://gbvzfjrx-5173.brs.devtunnels.ms",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(registerUser)
app.include_router(checkUser)
app.include_router(getUser)
app.include_router(updateImage)
app.include_router(trips)
app.include_router(get_trips)
app.include_router(login)
app.include_router(buyTrip)

@app.on_event("startup")
def startup():
    db_registerUser()
    db_trips()
