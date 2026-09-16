from fastapi import APIRouter, Request
from ...Databases.Conn.trips import connect_database_trip
from ...Databases.Conn.users import connect_database

router = APIRouter()


@router.get("/getTripsHistory")
def tripsHistory(request: Request):
    session_token = request.cookies.get("user_session_token")
    conn = None
    connTrip = None
    cursor = None
    cursorTrip = None
    try:
        conn, cursor = connect_database()
        connTrip, cursorTrip = connect_database_trip()
        cursor.execute(
            "select purchasedTrips from usersPousae where session_token = %s",
            (session_token,),
        )
        tripId = cursor.fetchone()[0]
        cursorTrip.execute(
            "select name, description,startdate, enddate,numberoftravelers, petsallowed, price , review,session_token from trips where id = ANY(%s)",
            (tripId,),
        )
        session_tokenCT = cursorTrip.fetchall()[8]
        cursor.execute('select name, image_url from usersPousae where session_token = ANY(%s)',(session_tokenCT,))
        owners = cursor.fetchall()
        trip = [
            {
                "name": row[0],
                "description": row[1],
                "startDate": row[2],
                "endDate": row[3],
                "numberOfTravelers": row[4],
                "petsAllowed": row[5],
                "price": row[6],
                "review": row[7],
                "ownerName": owners[0],
                "ownerImage": owners[1]
            }
            for row in cursorTrip.fetchall()
        ]
        return {"Status": True, "Trip": trip}
    except Exception as e:
        return {"Status": False, "Error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        if cursorTrip:
            cursorTrip.close()
        if connTrip:
            connTrip.close()
