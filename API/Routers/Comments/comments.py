from fastapi import APIRouter, Request
from ...Validation.Comments.comments import comment as data
from ...Databases.Conn.trips import connect_database_trip
from google import genai
import os
from dotenv import load_dotenv
from datetime import date
router = APIRouter()

load_dotenv(encoding="utf-8")

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=GEMINI_API_KEY)


@router.post("/createComment")
def createComment(Data: data, request: Request):
    conn = None
    cursor = None
    session_token = request.cookies.get("user_session_token")
    try:
        conn, cursor = connect_database_trip()
        cursor.execute('select userscomments from trips where id = %s AND %s = ANY(usersComments)', (Data.tripId, session_token))
        response = cursor.fetchone()
        if response:
            return {'Status': False, 'Error': "Unfortunately, you've already commented!"}
        cursor.execute('select endDate from trips where id = %s', (Data.tripId,))
        endDate = cursor.fetchone()
        if not endDate:
            return{'Status': False, 'Error': 'The end date was not found.'}
        if date.today() < date.fromisoformat(endDate[0]):
            return{'Status': False, 'Error':"The trip isn't over yet—you can comment once it's finished!"}
        moderation = client.models.generate_content(
            model="gemini-3.1-flash-lite",
            contents=f"""
                You are moderating a user comment about a travel experience.

                Comment:
                {Data.comment}

                Your task is to determine whether this travel comment should be BLOCKED or considered SAFE.

                IMPORTANT:
                - This is a travel review/comment section.
                - Users are allowed to express negative opinions about trips, destinations, hotels, restaurants, transportation, tour guides, prices, service quality, delays, organization, and other travel experiences.
                - Criticism, complaints, dissatisfaction, disappointment, warnings, and negative reviews are SAFE.
                - Strong opinions and unfavorable feedback are SAFE as long as they do not contain prohibited content.
                - Do NOT block a comment simply because it is negative, rude in tone, or critical of a travel experience.

                BLOCK only if the comment contains:
                - Hate speech or attacks against a protected group
                - Harassment or targeted personal insults
                - Sexually explicit content
                - Graphic or glorifying descriptions of violence
                - Discrimination
                - Clearly offensive, abusive, or inappropriate content unrelated to legitimate travel feedback

                Examples of SAFE comments:
                - "The hotel was terrible and the room was dirty."
                - "I hated this trip. The service was very poor."
                - "The tour guide was unprofessional and rude."
                - "The destination was disappointing and not worth the price."
                - "I had a horrible experience with this airline."
                - "The restaurant was overpriced and the food was bad."

                These are legitimate travel opinions and must be SAFE.

                Only return exactly one of these two words:

                SAFE

                or

                BLOCK
""",
        )
        if "BLOCK" in moderation.text.strip().upper():
            return {"Status": False, "Error": "That comment was offensive."}
        cursor.execute('select review from trips where id  = %s', (Data.tripId,))
        review = cursor.fetchone()[0]
        if review is None:
            return {"Status": False, "Error": "Trip review not found."}
        new_review = (review * 10 + Data.note) / 11
        cursor.execute("""
            UPDATE trips
            SET
                comments = array_append(comments, %s),
                note = array_append(note, %s),
                review = %s,
                usersComments = array_append(usersComments, %s)
            WHERE id = %s
        """, (
            Data.comment,
            Data.note,
            new_review,
            session_token,
            Data.tripId
        ))
        conn.commit()
        return {'Status': True}
    except Exception as e:
        return {"Status": False, "Error": str(e)}
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
