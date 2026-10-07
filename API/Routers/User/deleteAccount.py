from fastapi import APIRouter, Response, Request
from ...Databases.Conn.users import connect_database
from ...Databases.Conn.trips import connect_database_trip
router = APIRouter()
@router.delete("/deleteAccount")
def deleteAccount(request: Request, response: Response):
    conn = None
    cursor= None
    connTrip = None
    cursorTrip= None
    session_token = request.cookies.get('user_session_token')
    try:
        conn, cursor = connect_database()
        connTrip, cursorTrip= connect_database_trip()
        cursor.execute('delete from usersPousae where session_token = %s', (session_token,))
        conn.commit()
        cursorTrip.execute("delete from trips where session_token = %s", (session_token,))
        connTrip.commit()
        response.delete_cookie(
            key="user_session_token"
            ,path="/",
            samesite="none",
            secure=True
        )
        return{"Status":True}
    except Exception as e:
        return{"Status":False, "Error": str(e)} 
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        if cursorTrip:
            cursorTrip.close()
        if connTrip:
            connTrip.close() 