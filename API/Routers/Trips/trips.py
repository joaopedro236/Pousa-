from ...Databases.Conn.trips import connect_database_trip
from ...Validation.Trip.trips import Trips
from fastapi import APIRouter, Request
from datetime import date, datetime

router = APIRouter()


@router.post("/trips")
def trips(dataValidation: Trips, request: Request):
    conn = None
    cursor = None
    session_token = request.cookies.get("user_session_token")
    try:
        conn, cursor = connect_database_trip()
        start_date = datetime.strptime(dataValidation.startDate, "%Y-%m-%d").date()
        end_date = datetime.strptime(dataValidation.endDate, "%Y-%m-%d").date()

        if start_date < date.today():
            return {"Status": False, "Error": "The date cannot be in the past."}
        elif end_date < date.today():
            return {"Status": False, "Error": "The end date cannot be in the past."}

        elif end_date < start_date:
            return {
                "Status": False,
                "Error": "The end date cannot be before the start date.",
            }
        if not session_token:
            return {"Status": False, "Error": "Not session token"}
        cursor.execute(
            """insert into trips(
        name, description, startDate, endDate, numberOfTravelers, petsAllowed,price, session_token) values(%s, %s, %s, %s, %s, %s, %s,%s)""",
            (
                dataValidation.name,
                dataValidation.description,
                start_date,
                end_date,
                dataValidation.numbertravelers,
                dataValidation.petsAllowed,
                dataValidation.price,
                session_token,
            ),
        )
        conn.commit()
        return{'Status': True}
    except Exception:
        return {"Status": False, "Error": "An error occurred"}

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
