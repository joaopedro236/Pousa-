from ...Validation.Trip.deleteTrip import data
from fastapi import APIRouter
from ...Databases.Conn.trips import connect_database_trip
from ...Databases.Conn.release_database import release_database

router = APIRouter()


@router.delete("/deleteTrip")
def deleteTrip(Data: data):
    conn = None
    cursor = None
    try:
        conn, cursor = connect_database_trip()
        cursor.execute("delete from trips where id = %s", (Data.id,))
        conn.commit()
        return {"Status": True}
    except Exception as e:
        return {"Status": False, "Error": str(e)}
    finally:
        release_database(conn, cursor)
