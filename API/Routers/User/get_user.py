from fastapi import APIRouter, Request
from ...Databases.Conn.users import connect_database
from ...Databases.Conn.trips import connect_database_trip

router = APIRouter()


@router.get("/getUser")
def getUser(request: Request):
    conn = None
    cursor = None
    connTrip = None
    cursorTrip = None
    session_token = request.cookies.get("user_session_token")
    try:
        if not session_token:
            return {"Status": False, "Error": "There is no session_token."}
        conn, cursor = connect_database()
        connTrip, cursorTrip = connect_database_trip()
        cursor.execute(
            """select name, email, password, cpf, session_token,image_url,moneyalreadyspent ,  tripstaken,money, star from usersPousae  where session_token = %s""",
            (session_token,)
        )
        response = cursor.fetchone()
        starUser =response[9]
        if not response:
            return {"Status": False, "Error": "The user does not exist."}
        cursorTrip.execute("select id from trips where session_token =%s",(session_token,))
        idTripStar = cursorTrip.fetchone()
        tripsExists= False if not idTripStar[0] else True
        cursorTrip.execute(
            "select id, name, description, numberOfTravelers, petsAllowed, price, review, usersPurchased, session_token from trips where id= %s", (starUser,)
        )
        trips = cursorTrip.fetchall()
        
        if not trips:
            trips =[]
        trip=[] 
        
        for idTripStar in trips:
            cursor.execute(
                "select name, image_u from usersPousae where session_token =%s",
                (idTripStar[8],)
            )
            ownerOfTheTrip= cursor.fetchone()
            trip.append(
                {
                    "id": idTripStar[0],
                    "name":idTripStar[1],
                    "description": idTripStar[2],
                    "numberOfTravelers":idTripStar[3],
                    "petsAllowed": idTripStar[4],
                    "price":idTripStar[5],
                    "review": idTripStar[6],
                    "usersPurchased": idTripStar[7],
                    "ownerName": ownerOfTheTrip[0] if ownerOfTheTrip else None,
                    "ownerImage": ownerOfTheTrip[1] if ownerOfTheTrip else None
                }
            )
            trips = trip
        return {
            "Status": True,
            "name": response[0],
            "email": response[1],
            "cpf": response[3],
            "image_url": response[5],
            "moneyalreadyspent": response[6],
            "tripsTaken": response[7],
            "money": response[8],
            "tripsExists": tripExists,
            "favoriteTrips":trips
        }
    except Exception as e:
        return {"Status": False, "Error": str(e)}

    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        if cursorTrip:
            cursorTrip.close()
        if connTrip:
            connTrip.close()
