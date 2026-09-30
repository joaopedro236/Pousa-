from fastapi import APIRouter
from ...Validation.Trip.suggestedDescription import items
from google import genai
import os 
from dotenv import load_dotenv
router = APIRouter()
load_dotenv(".env.apis")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=GEMINI_API_KEY)
@router.post('/suggestedDescription')
def suggestedDescriptio(data: items):
    try:
        if not data.name: 
            return{"Status": False, "Error":"It must include a title (and preferably a brief description)."}
        SYSTEM_PROMPT= """You are an artificial intelligence that will create or improve a description. If there is no description, you will create one (based on the title and any additional data provided by the user); if there is already a description, you will improve it. The content must not include violence or inappropriate material, and it must be related to travel."""
        contents = f"""
        TRIP INFORMATION
        title:{data.name}
        description: {data.description}
        startDate: {data.StartDate}
        endDate:{data.EndDate}
        petsAllowed: {data.petsAllowed}
        numberTravelers: {data.numberTravelers}
        price: {data.price}"""
        try:
            response = client.models.generate_content(
            model="gemini-3.1-flash-lite",
            contents=contents,
            config={
                "system_instruction": SYSTEM_PROMPT
            }
        )
        except Exception as e:
            if "503" in str(e):
                response = client.models.generate_content(
                    model="gemini-3.1-flash-lite",
                    contents= contents,
                    config={
                        "system_instruction": SYSTEM_PROMPT
                    }
                )
            else:
                raise
        return{"Status": True, "Response": response.text}
    except Exception as e:

        return{"Status": False, "Error": str(e)}