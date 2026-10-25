from ...Databases.Conn.trips import connect_database_trip, poolTrips
from ...Schemas.Trip.trips import createTrip
from fastapi import APIRouter, Request, UploadFile, File, Form
import json
from psycopg2.extras import Json
from ...Databases.Conn.release_database import release_database
from urllib.parse import urlencode
from ...Validation.createTripValidation import createTripValidation

router = APIRouter()
import os
from dotenv import load_dotenv
import requests

load_dotenv(".env")
IMGBB_URL = os.getenv("IMGBB_URL")


@router.post("/trips")
async def trips(
    request: Request,
    name: str = Form(...),
    description: str = Form(...),
    selected: str = Form(...),
    numbertravelers: int = Form(...),
    petsAllowed: str = Form(...),
    price: float = Form(...),
    cep: str = Form(...),
    file: UploadFile = File(...),
):
    conn = None
    cursor = None
    session_token = request.cookies.get("user_session_token")

    try:
        conn, cursor = connect_database_trip()

        if not session_token:
            return {"Status": False, "Error": "Not session token"}
        tripValidation = await createTripValidation(file, name, cep, description)

        if not tripValidation["Status"]:
            return tripValidation

            cepResult = tripValidation["cepVerificationResult"]

        selected_data = json.loads(selected) if isinstance(selected, str) else selected

        cepResult = response.json()
        Address = (
            f"{cepResult.get('logradouro', '')}, "
            f"{cepResult.get('bairro', '')}, "
            f"{cepResult.get('localidade', '')} - "
            f"{cepResult.get('uf', '')}, Brasil"
        )

        urlGoogleMaps = "https://www.google.com/maps/?" + urlencode(
            {"q": Address, "output": "embed"}
        )

        save_image = requests.post(
            "https://api.imgbb.com/1/upload",
            params={"key": IMGBB_URL},
            files={"image": (file.filename, content, file.content_type)},
            timeout=10,
        )

        if not save_image.ok:
            return {"Status": False, "Error": save_image.status_code}

        save_image_data = save_image.json()

        cursor.execute(
            """
            INSERT INTO trips(
                name,
                description,
                numberoftravelers,
                petsallowed,
                price,
                session_token,
                cep,
                street,
                complement,
                neighborhood,
                city,
                state,
                state_code,
                region,
                ibge,
                areacode,
                siafi,
                selected,
                img_main_url,
                url_google_maps
            ) VALUES (
                %s,%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s
            )
            """,
            (
                name,
                description,
                numbertravelers,
                petsAllowed,
                price,
                session_token,
                cep,
                cepResult.get("logradouro"),
                cepResult.get("complemento"),
                cepResult.get("bairro"),
                cepResult.get("localidade"),
                cepResult.get("estado"),
                cepResult.get("uf"),
                cepResult.get("regiao"),
                cepResult.get("ibge"),
                cepResult.get("ddd"),
                cepResult.get("siafi"),
                Json(selected_data),
                save_image_data["data"]["url"],
                str(urlGoogleMaps),
            ),
        )
        conn.commit()

        return {"Status": True}

    except Exception as e:
        return {"Status": False, "Error": str(e)}

    finally:
        release_database(conn, cursor, poolTrips)
