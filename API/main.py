from fastapi import FastAPI
from API.Databases.DB.users import database as db_registerUser
from API.Routers.User.registerUser import router as registerUser
from API.Validation.User.checkUser import router as checkUser
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
@app.on_event('startup')
def startup():
    db_registerUser()