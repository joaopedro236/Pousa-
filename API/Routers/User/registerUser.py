from ...Databases.Conn.users import connect_database, poolUser
from fastapi import APIRouter, Response
import uuid
from argon2 import PasswordHasher
from ...Schemas.User.registerUser import registerUser
import requests
from ...Databases.Conn.release_database import release_database
from ...Validation.userCreationValidation import registerUserVerification

router = APIRouter()
ph = PasswordHasher()


@router.post("/registerUser")
def registerUser(data: registerUser, responseCookie: Response):
    conn = None
    cursor = None
    try:
        conn, cursor = connect_database()
        session_token = str(uuid.uuid4())
        hashPassword = ph.hash(data.password)
        verification = registerUserVerification(
            data.email, data.cpf, data.country, data.name
        )
        if not verification["Status"]:
            return verification
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
            samesite="none",
            secure=True,
            path="/",
        )
        return {"Status": True}

    except Exception as e:
        if conn is not None and not conn.closed:
            conn.rollback()
            return {"Status": False, "Error": str(e)}

    finally:
        if conn is not None and not conn.closed:
            release_database(conn, cursor, poolUser)
