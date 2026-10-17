from ...Validation.User.login import login
from ...Databases.Conn.users import connect_database
from fastapi import APIRouter,Response, Request 
from ...Databases.Conn.banUser import connect_databaseBU
router = APIRouter()


@router.post("/login")
def login(data: login, response: Response, request:Request):
    conn = None
    cursor = None
    connBU= None
    cursorBU= None
    try:
        connBU, cursorBU = connect_databaseBU()
        ip = request.client.host
        attemptsLogin = 0
        conn, cursor = connect_database()
        cursor.execute(
            """
            SELECT email, cpf, session_token
            FROM usersPousae
            WHERE email = %s AND cpf = %s
            """,
            (data.email, str(data.cpf))
        )
        result = cursor.fetchone()
        if not result:
            attemptsLogin = attemptsLogin +1

            
            if attemptsLogin >= 10:
                cursorBU.execute("""
                insert into bans(ip, reason, expires_at) VALUES(?,?,datetime("now","+1 day"))
                """,(str(ip),"Brute Force"))
                return{"Status":False, "Error":"Brute Force Detected"}
            return {"Status": False, "Error": "Not Result"}

        response.set_cookie(
            key='user_session_token',
            value=result[2],
            httponly=True,
            max_age=60 * 60 * 24 * 7,
            samesite='none',
            secure=True,
            path='/',
        )
        return{'Status': True}          
    except Exception:
        return {"Status": False, "Error": "An Error Occured"}
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        if cursorBU:
            cursorBU.close()
        if connBU:
            connBU.close()
