from ...Validation.User.login import login
from ...Databases.Conn.users import connect_database
from fastapi import APIRouter, Response
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError, VerificationError
from ...Databases.Conn.release_database import release_database

router = APIRouter()
ph = PasswordHasher()


@router.post("/login")
def login(data: login, response: Response):
    conn = None
    cursor = None

    try:

        conn, cursor = connect_database()
        cursor.execute(
            """
            SELECT email, cpf, session_token,password
            FROM usersPousae
            WHERE email = %s AND cpf = %s
            """,
            (data.email, str(data.cpf)),
        )
        result = cursor.fetchone()
        if not result:

            return {"Status": False, "Error": "Not Result"}
        try:
            ph.verify(result[3], data.password)
        except VerifyMismatchError:
            return {"Status": False, "Error": "Invalid password"}
        response.set_cookie(
            key="user_session_token",
            value=result[2],
            httponly=True,
            max_age=60 * 60 * 24 * 7,
            samesite="none",
            secure=True,
            path="/",
        )
        return {"Status": True}
    except Exception:
        return {"Status": False, "Error": "An Error Occured"}
    finally:
        release_database(conn, cursor)
