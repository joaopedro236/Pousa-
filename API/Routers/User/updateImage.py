import requests
import os
from dotenv import load_dotenv
from ...Databases.Conn.users import connect_database
from fastapi import APIRouter, UploadFile, File, Request

load_dotenv(encoding="utf-8")
API_KEY = os.getenv("IMGBB_URL")

router = APIRouter()
MAX_SIZE = 5 * 1024 * 1024


@router.post("/upload-image")
async def upload_image(
    request: Request,
    file: UploadFile = File(...)
):
    conn = None
    session_token = request.cookies.get("user_session_token") 

    cursor = None
    allowed_extensions = {"image/jpe'g", "image/png", "image/webp"}
    if file.content_type not in allowed_extensions:
        return {"Error": "Only JPG, PNG, or WEBP are allowed", "Status": False}

    content = await file.read()

    if len(content) > MAX_SIZE:
        return {"Error": "The image must be no larger than 5 MB.", "Status": False}

    temp_path = None
    try:
        conn, cursor = connect_database()
        response = requests.post(
            "https://api.imgbb.com/1/upload",
            params={"key": API_KEY},
            files={"image": (file.filename, content, file.content_type)},
        )
        data = response.json()

        if not response.ok:
            return {"status": False, "Error": response.status_code}
        cursor.execute(
            """
    UPDATE usersPousae
    SET image_url = %s
    WHERE session_token = %s
    """,
            (data["data"]["url"], session_token),
        )
        conn.commit()
        return {"status": True, "url": data["data"]["url"]}
    except Exception :
        return {"Status": False,'Error': 'An error occurred'}
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
