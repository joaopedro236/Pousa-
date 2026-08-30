from fastapi import FastAPI
from API.Databases.DB.users import database as db_registerUser
from API.Routers.User.registerUser import router as registerUser
from API.Validation.User.checkUser import router as checkUser
from API.Routers.User.get_user import router as getUser
from API.Routers.User.updateImage import router as updateImage
from API.Routers.Trips.trips import router as trips
from API.Routers.Trips.get_trips import router as get_trips
import os
from dotenv import load_dotenv
app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware
load_dotenv()

origins = os.getenv("FRONTEND_URLS").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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
@app.on_event('startup')
def startup():
    db_registerUser()