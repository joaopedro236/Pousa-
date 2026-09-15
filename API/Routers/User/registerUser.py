from ...Databases.Conn.users import connect_database
from fastapi import APIRouter, Response
import uuid
from argon2 import PasswordHasher
from ...Validation.User.registerUser import registerUser
from google import genai

router = APIRouter()
ph = PasswordHasher()

import os
from dotenv import load_dotenv

load_dotenv(encoding="utf-8")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=GEMINI_API_KEY)


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
        moderation = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=f"""
Analyze this travel trip content.

Name: {data.name}


Block only if the content contains:
- Hate speech
- Harassment or targeted insults
- Sexually explicit content
- Violent or graphic content
- Discrimination
- Clearly offensive or inappropriate content

Normal travel-related content is SAFE.

Respond with ONLY:
SAFE
or
BLOCK
""",
        )

        if "BLOCK" in moderation.text.strip().upper():
            return {"Status": False, "Error": "Inappropriate content."}
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
        return {"Status": False, "Error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
