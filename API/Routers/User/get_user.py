from fastapi import APIRouter, Request
from ...Databases.Conn.users import connect_database
from ...Databases.Conn.trips import connect_database_trip
router = APIRouter()


@router.get("/getUser")
def getUser(request: Request):
    conn = None
    cursor = None
    connTrip = None
    cursorTrip = None
    session_token = request.cookies.get("user_session_token")
    try:
        if not session_token:
            return {"Status": False, "Error": "There is no session_token."}
        conn, cursor = connect_database()
        connTrip, cursorTrip = connect_database_trip()
        cursor.execute(
            """select name, email, password, cpf, session_token,image_url,moneyalreadyspent ,  tripstaken,money from usersPousae  where session_token = %s""",
            (session_token,),
        )
        response = cursor.fetchone()
        if not response:
            return {"Status": False, "Error": "The user does not exist."}
        cursorTrip.execute('select id from trips where session_token = %s', (session_token,))
        tripExists= cursorTrip.fetchone()
        return {
            "Status": True,
            "name": response[0],
            "email": response[1],
            "cpf": response[3],
            "image_url": response[5],
            "moneyalreadyspent": response[6],
            "tripsTaken": response[7],
            "money": response[8],
            'tripsExists': False if not tripExists[0] else True
        }
    except Exception :
        return {"Status": False, "Error": 'An error occurred'}

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        if cursorTrip:
            cursorTrip.close()
        if connTrip:
            connTrip.close()