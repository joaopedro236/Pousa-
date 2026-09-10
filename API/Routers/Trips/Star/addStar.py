from fastapi import APIRouter, Request
from ....Databases.Conn.trips import connect_database_trip
from ....Databases.Conn.users import connect_database
from ....Validation.Trip.star import buy_trip as data
from .base import model 
router = APIRouter()


@router.post("/addStar")
def addStar(Data: data, request: Request):
    return model(
        """
        SELECT name
        FROM trips
        WHERE id = %s
        """,

        """
        UPDATE usersPousae
        SET star = array_append(star, %s)
        WHERE session_token = %s
        """,

        Data,
        request
    )