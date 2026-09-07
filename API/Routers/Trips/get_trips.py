from fastapi import APIRouter
from ...Databases.Conn.users import connect_database
from ...Databases.Conn.trips import connect_database_trip

router = APIRouter()


@router.get("/getTrips")
def get_trips():
    conn = None
    cursor = None
    connUser = None
    cursorUser = None
    try:
        conn, cursor = connect_database_trip()
        connUser, cursorUser = connect_database()
        cursor.execute("""
    SELECT t.name, t.description, t.startDate, t.endDate,
           t.numberOfTravelers, t.petsAllowed, t.price,
           u.name, u.image_url, t.session_token, t.review, t.id,t.numberOfTravelers
    FROM trips t
    LEFT JOIN usersPousae u
    ON t.session_token = u.session_token
""")
        result = cursor.fetchall()
        trips = []
        for trip in result:
            cursorUser.execute(
                "select name, image_url from usersPousae where session_token = %s",
                (trip[9],),
            )
            resultUser = cursorUser.fetchone()

            trips.append(
                {
                    "name": trip[0],
                    "description": trip[1],
                    "startDate": trip[2],
                    "endDate": trip[3],
                    "numberOfTravelers": trip[4],
                    "petsAllowed": trip[5],
                    "price": trip[6],
                    "ownerName": resultUser[0] if resultUser else None,
                    "ownerImage": resultUser[1] if resultUser else None,
                    "review": trip[10],
                    'id': trip[11],
                    'travelers': trip[12]
                }
            )

        return {"Status": True, "trips": trips}
    except Exception :
        return {"Status": False, "Error": 'An error occurred'}
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        if cursorUser:
            cursorUser.close()
        if connUser:
            connUser.close()
