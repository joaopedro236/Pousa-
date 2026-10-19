from ...Databases.Conn.trips import connect_database_trip
from ...Validation.Trip.trips import Trips
from fastapi import APIRouter, Request,UploadFile, File
import json
from psycopg2.extras import Json

from google import genai

router = APIRouter()
import os
from dotenv import load_dotenv
import requests

load_dotenv(".env.apis")
load_dotenv(".env")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
IMGBB_URL = os.getenv("IMGBB_URL")
client = genai.Client(api_key=GEMINI_API_KEY)
MAX_SIZE = 5 * 1024 * 1024

@router.post("/trips")
async def trips(dataValidation: Trips, request: Request, file:UploadFile= File(...)):
    conn = None
    cursor = None
    session_token = request.cookies.get("user_session_token")
    allowed_extensions= {"image/jpeg", "image/png", "image/webp"}
    if file.content_type not in allowed_extensions:
        return {"Error": "Only JPG, PNG, or WEBP are allowed", "Status": False}
    content = await file.read()
    if len(content)> MAX_SIZE:
        return {"Error": "The image must be no larger than 5 MB.", "Status": False}
    temp_path =None
    try:
        conn, cursor = connect_database_trip()

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
""",
        )

        if "BLOCK" in moderation.text.strip().upper():
            return {"Status": False, "Error": "Inappropriate content."}
        response = requests.get(
            f"https://viacep.com.br/ws/{str(dataValidation.cep.strip())}/json/",
            timeout=10,
        )

        if response.status_code != 200:
            return {"Status": False, "Error": response.text}
        cepResult = response.json()
        save_image =requests.post(
            "https://api.imgbb.com/1/upload",
            params={"key": IMGBB_URL},
            files={"image": (file.filename, content, file.content_type)},
            timeout=10
        )
        
        if not save_image.ok:
            return{"Status": False, "Error": save_image.status_code}
        save_image_data= save_image.json()
        cursor.execute(
            """insert into trips(
        name, description,numberOfTravelers, petsAllowed,price, session_token, cep, street, complement, neighborhood, city, state, state_code, region, ibge,areacode, siafi, selected, img_main_url) values( %s,%s,%s,%s,%s,%s,%s,%s, %s, %s,%s,%s,%s, %s, %s, %s, %s, %s,%s)""",
            (
                dataValidation.name,
                dataValidation.description,
                dataValidation.numbertravelers,
                dataValidation.petsAllowed,
                dataValidation.price,
                session_token,
                dataValidation.cep,
                cepResult["logradouro"],
                cepResult["complemento"],
                cepResult["bairro"],
                cepResult["localidade"],
                cepResult["estado"],
                cepResult["uf"],
                cepResult["regiao"],
                cepResult["ibge"],
                cepResult["ddd"],
                cepResult["siafi"],
                Json(dataValidation.selected),
                save_img_data["data"]["url"]
            ),
        )
        conn.commit()

        return {"Status": True}
    except Exception as e:
        return {"Status": False, "Error": str(e)}

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
