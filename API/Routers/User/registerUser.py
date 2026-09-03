from ...Databases.Conn.users import connect_database
from fastapi import APIRouter, Response
import uuid
from argon2 import PasswordHasher
from ...Validation.User.registerUser import registerUser

router = APIRouter()
ph = PasswordHasher()


@router.post("/registerUser")
def registerUser(data: registerUser, responseCookie: Response):
    try:
        conn, cursor = connect_database()
        cursor.execute(
            """select name, email from usersPousae
        WHERE email = %s""",
            (data.email,),
        )


        response = cursor.fetchone()
        if response:
            return {"Status": False, "Error": "email already exists."}
        session_token = str(uuid.uuid4())
        hashPassword = ph.hash(data.password)
        cursor.execute(
            """
            INSERT INTO usersPousae(
     name, email, password, session_token, cpf) values(%s, %s,%s,%s,%s)""",
            (data.name, data.email, hashPassword, session_token, data.cpf),
        )
        conn.commit()
        responseCookie.set_cookie(
            key="user_session_token",
            value=session_token,
            httponly=True,
            max_age=60 * 60 * 24 * 7,
            samesite="lax",
            secure=False,
            path="/",
        )
        return {"Status": True}
    except Exception as e:
        return {"Status": False, "Error": "An error occurred."}
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
