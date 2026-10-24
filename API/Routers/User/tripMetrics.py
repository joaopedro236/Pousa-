from ...Databases.Conn.trips import connect_database_trip, poolTrips
from ...Databases.Conn.users import connect_database, poolUser
from fastapi import APIRouter, Request
from datetime import date
from ...Databases.Conn.release_database import release_database

router = APIRouter()


@router.get("/metrics")
def metrics(request: Request):
    conn = None
    connTrip = None
    cursor = None
    session_token = request.cookies.get("user_session_token")
    cursorTrip = None
    try:
        current_week = date.today().isocalendar().week
        conn, cursor = connect_database()
        connTrip, cursorTrip = connect_database_trip()
        cursorTrip.execute(
            "select id,review,count(comments) from trips where session_token = %s group by id,review",
            (session_token,),
        )
        trip = cursorTrip.fetchone()
        if not trip:
            return {"Status": False}
        cursor.execute(
            "select moneyobtained,tripsobtained,last_week,tripsobtainedhistoryS  from usersPousae where session_token = %s",
            (session_token,),
        )
        response = cursor.fetchone()
        if response[2] != current_week:
            cursor.execute(
                """
                update usersPousae
                set tripsobtainedhistoryS = ARRAY[0,0,0,0,0,0,0],
                    last_week = %s
                where session_token = %s
                """,
                (current_week, session_token),
            )
            conn.commit()
        cursorTrip.execute(
            """
            SELECT
                    t.name,
                            t.description,
                                                    t.numberOfTravelers,
                                                            t.petsAllowed,
                                                                    t.price,
                                                                            u.name,
                                                                                    u.image_url,
                                                                                            t.session_token,
                                                                                                    t.review,
                                                                                                            t.id
                                                                                                                FROM trips t
                                                                                                                    LEFT JOIN userspousae u
                                                                                                                            ON t.session_token = u.session_token
                                                                                                                                WHERE t.session_token = %s
                                                                                                                                """,
            (session_token,),
        )

        result = cursorTrip.fetchall()
        trips = []
        for t in result:
            cursor.execute(
                "select name, image_url from userspousae where session_token = %s",
                (session_token,),
            )
            resultUser = cursor.fetchone()
            trips.append(
                {
                    "name": t[0],
                    "description": t[1],
                    "numberOfTravelers": t[2],
                    "petsAllowed": t[3],
                    "price": t[4],
                    "ownerName": resultUser[0] if resultUser else None,
                    "ownerImage": resultUser[1] if resultUser else None,
                    "review": t[8],
                    "id": t[9],
                }
            )
        return {
            "Status": True,
            "moneyObtained": response[0],
            "tripsObtained": response[1],
            "Review": trip[1],
            "commentsCount": trip[2],
            "tripsobtainedhistoryS": response[3],
            "trip": trips,
        }
    except Exception as e:
        return {"Status": False, "Error": str(e)}
    finally:
        release_database(conn, cursor, poolUser)
        release_database(connTrip, cursorTrip, poolTrips)
