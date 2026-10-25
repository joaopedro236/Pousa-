from google import genai
import os
from dotenv import load_dotenv
import requests

load_dotenv(".env.apis")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=GEMINI_API_KEY)
MAX_SIZE = 5 * 1024 * 1024


async def createTripValidation(file, name, cep, description):
    allowed_extensions = {"image/jpeg", "image/png", "image/webp"}
    if file.content_type not in allowed_extensions:
        return {"Status": False, "Error": "Only JPG, PNG, or WEBP are allowed"}
    content = await file.read()
    if len(content) > MAX_SIZE:
        return {"Status": False, "Error": "The image must be no larger than 5 MB."}
    try:
        moderation = client.models.generate_content(
            model="gemini-3.1-flash-lite",
            contents=f"""
            Analyze this travel trip content.
            Name: {name}
            Description: {description}
            
            Block onky if the content contains:
            - Hate speech
            - Harassment or targeted insults 
            - Sexually explicit content
            - Violent or graphic content
            - Discrimination
            - Clearly offensive or inappropriate content 
            
            Normal trave-related content is SAFE.
            
            Respond with ONLY:
            SAFE
            or
            BLOCK""",
        )
        if "BLOCK" in moderation.text.strip().upper():
            return {"Status": False, "Error": "Inappropriate content."}
        response = requests.get(
            f"https://viacep.com.br/ws/{str(cep.strip())}/json/",
            timeout=10,
        )
        if response.status_code != 200:
            return {"Status": False, "Error": response.text}
        cepVerificationResult = response.json()
        return {"cepVerificationResult": cepVerificationResult}
    except Exception as e:
        return {"Status": False, "Error": str(e)}
