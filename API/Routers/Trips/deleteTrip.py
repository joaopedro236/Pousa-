from ...Schemas.Trip.deleteTrip import data
from fastapi import APIRouter, Response
from ...Databases.Conn.trips import connect_database_trip, poolTrips
from ...Databases.Conn.release_database import release_database

router = APIRouter()


@router.delete("/deleteTrip")
def deleteTrip(Data: data, request: Request):
    conn = None
    cursor = None
    session_token = request.cookies.get("user_session_token")
    try:
        conn, cursor = connect_database_trip()
        
        cursor.execute("delete from trips where id = %s and session_token = %s", (Data.id, session_token))
        conn.commit()
        return {"Status": True}
    except Exception as e:
        return {"Status": False, "Error": str(e)}
    finally:
        release_database(conn, cursor, poolTrips)
