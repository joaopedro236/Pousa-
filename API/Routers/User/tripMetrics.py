from ...Databases.Conn.trips import connect_database_trip
from ...Databases.Conn.users import connect_database
from fastapi import APIRouter, Request

router = APIRouter()


@router.get("/metrics")
def metrics(request: Request):
    conn = None
    connTrip = None
    cursor = None
    session_token = request.cookies.get("user_session_token")
    cursorTrip = None
    try:
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
            "select moneyobtained,tripsobtained from usersPousae where session_token = %s",
            (session_token,),
        )
        response = cursor.fetchone()
        return {
            "Status": True,
            "moneyObtained": response[0],
            "tripsObtained": response[1],
            "Review": trip[1],
            "commentsCount": trip[2],
        }
    except Exception:
        return {"Status": False, "Error": "An occured error"}
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        if cursorTrip:
            cursorTrip.close()
        if connTrip:
            connTrip.close()
