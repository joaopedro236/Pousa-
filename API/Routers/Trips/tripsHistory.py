from fastapi import APIRouter, Request
from ...Databases.Conn.trips import connect_database_trip, poolTrips
from ...Databases.Conn.users import connect_database, poolUser
from ...Databases.Conn.release_database import release_database

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
            "select name, description,numberoftravelers, petsallowed, price , review,session_token from trips where id = ANY(%s)",
            (tripId,),
        )
        trips = cursorTrip.fetchall()
        # session_token is the 7th column in the select above (index 6)
        session_tokenCT = [row[6] for row in trips]
        cursor.execute(
            "select session_token, name, image_url from usersPousae where session_token::text = ANY(%s)",
            (session_tokenCT,),
        )
        owners = cursor.fetchall()
        trip = [
            {
                "name": row[0],
                "description": row[1],
                "numberOfTravelers": row[2],
                "petsAllowed": row[3],
                "price": row[4],
                "review": row[5],
                "ownerName": next(
                    owner[1] for owner in owners if str(owner[0]) == row[6]
                ),
                "ownerImage": next(
                    owner[2] for owner in owners if str(owner[0]) == row[6]
                ),
            }
            for row in trips
        ]
        return {"Status": True, "Trip": trip}
    except Exception as e:
        return {"Status": False, "Error": str(e)}
    finally:
        release_database(conn, cursor, poolUser)
        release_database(connTrip, cursorTrip, poolTrips)
