from fastapi import Request
from ....Databases.Conn.trips import connect_database_trip
from ....Databases.Conn.users import connect_database
from ....Validation.Trip.star import buy_trip as data

def model(sql, sqlU,Data: data, request: Request):
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
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        if cursorTrip:
            cursorTrip.close()
        if connTrip:
            connTrip.close()