from ...Validation.User.login import login
from ...Databases.Conn.users import connect_database
from fastapi import APIRouter,Response

router = APIRouter()


@router.post("/login")
def login(data: login, response: Response):
    conn = None
    cursor = None
    try:
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
            return {"Status": False, "Error": "Not Result"}
        response.set_cookie(
            key='user_session_token',
            value=result[2],
            httponly=True,
            max_age=60 * 60 * 24 * 7,
            samesite='lax',
            secure=False,
            path='/',
        )
        return{'Status': True}          
    except Exception:
        return {"Status": False, "Error": "An Error Occured"}
    finally:
        if conn:
            conn.close()
        if cursor:
            cursor.close()
