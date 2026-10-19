from fastapi import APIRouter, Request
from ....Databases.Conn.trips import connect_database_trip
from ....Databases.Conn.users import connect_database

router = APIRouter()


@router.get("/getStar")
def getStar(request: Request):
    conn = None
    connTrip = None
    cursor = None
    cursorTrip = None
    session_token = request.cookies.get("user_session_token")

    try:
        conn, cursor = connect_database()
        connTrip, cursorTrip = connect_database_trip()
        cursor.execute(
            "select star from usersPousae where session_token = %s", (session_token,)
        )

        row = cursor.fetchone()
        ids = row[0] if row else None
        if not ids:
            return {"Status": True, "Trips": []}

        ids = row[0]

        cursorTrip.execute(
            """
            SELECT id, name, description, 
                numberOfTravelers, petsAllowed, price,
                review, usersPurchased, session_token
            FROM trips
            WHERE id = ANY(%s)
            """,
            (ids,),
        )

        trips = cursorTrip.fetchall()

        result = []

        for row in trips:
            cursor.execute(
                "select name, image_url from usersPousae where session_token = %s",
                (row[8],),
            )
            owner = cursor.fetchone()
            result.append(
                {
                    "id": row[0],
                    "name": row[1],
                    "description": row[2],
                    "numberOfTravelers": row[3],
                    "petsAllowed": row[4],
                    "price": row[5],
                    "review": row[6],
                    "usersPurchased": row[7],
                    "ownerName": owner[0] if owner else None,
                    "ownerImage": owner[1] if owner else None,
                }
            )

        trips = result

        return {"Status": True, "Trips": trips}
    except Exception as e:
        return {"Status": False, "Error": str(e)}
    finally:

        if cursor:
            cursor.close()

        if cursorTrip:
            cursorTrip.close()

        if conn:
            conn.close()

        if connTrip:
            connTrip.close()
