from fastapi import Request
from ....Databases.Conn.trips import connect_database_trip, poolTrips
from ....Databases.Conn.users import connect_database,poolUser
from ....Validation.Trip.star import buy_trip as data
from API.Databases.Conn.release_database import release_database


def model(sql, sqlU, Data: data, request: Request):
    conn = None
    cursor = None
    cursorTrip = None
    connTrip = None
    session_token = request.cookies.get("user_session_token")
    try:
        conn, cursor = connect_database()
        connTrip, cursorTrip = connect_database_trip()
        cursorTrip.execute(sql, (Data.id,))
        trip = cursorTrip.fetchall()
        if not trip:
            return {"Status": False, "Error": "Not exists trip"}
        cursor.execute(sqlU, (Data.id, session_token))
        conn.commit()
        return {"Status": True}
    except Exception:
        return {"Status": False, "Error": "An Error occurred"}
    finally:
        release_database(conn, cursor,poolUser)
        release_database(connTrip, cursorTrip,poolTrips)
