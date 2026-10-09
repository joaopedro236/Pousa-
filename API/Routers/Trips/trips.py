from ...Databases.Conn.trips import connect_database_trip
from ...Validation.Trip.trips import Trips
from fastapi import APIRouter, Request
from datetime import date, datetime
from google import genai
router = APIRouter()
import os
from dotenv import load_dotenv
import requests
load_dotenv(".env.apis")

GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')
client = genai.Client(api_key=GEMINI_API_KEY)
@router.post("/trips")
def trips(dataValidation: Trips, request: Request):
    conn = None
    cursor = None
    session_token = request.cookies.get("user_session_token")
    try:
        conn, cursor = connect_database_trip()
        start_date = datetime.strptime(dataValidation.startDate, "%Y-%m-%d").date()
        end_date = datetime.strptime(dataValidation.endDate, "%Y-%m-%d").date()

        if start_date < date.today():
            return {"Status": False, "Error": "The date cannot be in the past."}
        elif end_date < date.today():
            return {"Status": False, "Error": "The end date cannot be in the past."}

        elif end_date < start_date:
            return {
                "Status": False,
                "Error": "The end date cannot be before the start date.",
            }
        if not session_token:
            return {"Status": False, "Error": "Not session token"}
        moderation = client.models.generate_content(
        model="gemini-3.1-flash-lite",
        contents=f"""
Analyze this travel trip content.

Name: {dataValidation.name}
Description: {dataValidation.description}

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
"""
    )

        if "BLOCK" in moderation.text.strip().upper():
            return {"Status": False, "Error": "Inappropriate content."}
        response = requests.get(
            f"https://viacep.com.br/ws/{dataValidation.cep}/json/"
        )
        
        if response.status_code != 200:
            return{"Status": False, "Error":"Invalid Cep "}
        cepResult = response.json()
        if "erro" in cepResult:
                return {"Status": False, "Error": "Invalid CEP"}
        cursor.execute(
            """insert into trips(
        name, description, startDate, endDate, numberOfTravelers, petsAllowed,price, session_token, cep, street, complement, neighborhood, city, state, state_code, region, ibge,areacode, siafi) values( %s,%s,%s,%s,%s,%s,%s,%s, %s, %s,%s,%s,%s, %s, %s, %s, %s, %s,%s)""",
            (
                dataValidation.name,
                dataValidation.description,
                start_date,
                end_date,
                dataValidation.numbertravelers,
                dataValidation.petsAllowed,
                dataValidation.price,
                session_token,
                dataValidation.cep,
                cepResult.logradouro,
                cepResult.complemento, 
                cepResult.bairro,
                cepResult.localidade,
                cepResult.uf,
                cepResult.regiao,
                cepResult.igbe,
                cepResult.ddd,
                cepResult.siafi


            ),
        )
        conn.commit()

        return{'Status': True}
    except Exception as e:
        return {"Status": False, "Error": str(e)}

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
