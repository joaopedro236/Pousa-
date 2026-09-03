from fastapi import APIRouter, Request
from ...Databases.Conn.users import connect_database

router = APIRouter()


@router.get("/getUser")
def getUser(request: Request):
    conn = None
    cursor = None
    session_token = request.cookies.get("user_session_token")
    try:
        if not session_token:
            return {"Status": False, "Error": "There is no session_token."}
        conn, cursor = connect_database()
        cursor.execute(
            """select name, email, password, cpf, session_token,image_url,moneyalreadyspent ,  tripstaken from usersPousae  where session_token = %s""",
            (session_token,),
        )
        response = cursor.fetchone()
        if not response:
            return {"Status": False, "Error": "The user does not exist."}
       
        return {
            "Status": True,
            "name": response[0],
            "email": response[1],
            "cpf": response[3],
            "image_url": response[5],
            "moneyalreadyspent": response[6],
            "tripsTaken": response[7],
        }
    except Exception as e:
        return {"Status": False, "Error": str(e)}

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
