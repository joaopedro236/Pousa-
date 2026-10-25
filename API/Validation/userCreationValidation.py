import requests
from google import genai
import os
from dotenv import load_dotenv
from ..Databases.Conn.release_database import release_database
from ..Databases.Conn.users import connect_database, poolUser

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
IS_VALID_TIN = os.getenv("IS_VALID_TIN")
client = genai.Client(api_key=GEMINI_API_KEY)


def registerUserVerification(email, cpf, country, name):
    conn = None
    cursor = None
    try:
        conn, cursor = connect_database()
        cursor.execute("select email from usersPousae where email = %s", (email,))
        response = cursor.fetchone()
        if response:
            return {"Status": False, "Error": "email already exists."}
        result = requests.get(
            "https://api.isvalid.dev/v0/vat",
            headers={"Authorization": f"Bearer {IS_VALID_TIN}"},
            params={"value": cpf, "countryCode": country},
        ).json()
        if not result["valid"]:
            return {"Status": False, "Error": "No TIN"}
        moderation = client.models.generate_content(
            model="gemini-3.1-flash-lite",
            contents=f"""
            Analyze this travel trip content.
            Name: {name}
            
            Block only if the content contains:
            - Hate speech
            - harassment or targeted insults
            - Sexually explicit content 
            - Discrimination 
            - Clearly offensive or inappropriate content 
            
            Normal travel-related content is SAFE.
            
            Respond with ONLY:
            SAFE
            or
            BLOCK""",
        )
        if "BLOCK" in moderation.text.strip().upper():
            return {"Status": False, "Error": "Inappropriate content."}
        return {"Status": True}
    except Exception as e:
        return {"Status": False, "Error": str(e)}
    finally:
        release_database(conn, cursor, poolUser)
