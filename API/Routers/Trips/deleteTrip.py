from ...Validation.Trip.deleteTrip import data
from fastapi import APIRouter
from ...Databases.Conn.trips import connect_database_trip
router= APIRouter()
@router.delete('/deleteTrip')
def deleteTrip(Data:data):
    conn = None
    cursor= None
    try:
        conn, cursor = connect_database_trip()
        cursor.execute("delete from trips where id = %s", (Data.id))
        conn.commit()
        return{"Status":True}
    except Exception as e:
        return{"Status":False, "Error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()