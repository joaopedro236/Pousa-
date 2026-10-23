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
            """select name, email, password, cpf, session_token,image_url,moneyalreadyspent ,  tripstaken,money, star, purchasedTrips from usersPousae  where session_token = %s""",
            (session_token,)
        )
        response = cursor.fetchone()
        starUser =response[9]
        purchasedTrips= response[10]
        if not response:
            return {"Status": False, "Error": "The user does not exist."}
        cursorTrip.execute(
            "select name,description, numberOfTravelers, petsAllowed,price, review, session_token from trips where id = ANY(%s)",
            (purchasedTrips,)
        )
        tripsAlreadyPurchased= cursorTrip.fetchall()
        sessionTokenTripsAlreadyPurchased= [row[6] for row in tripsAlreadyPurchased]
        cursor.execute(
            "select session_token,name, image_url from usersPousae where session_token::text = ANY(%s)",
            (sessionTokenTripsAlreadyPurchased,)
        )
        ownersTripsAlreadyPurchased= cursor.fetchall()
        tripAlreadyPurchasedArray= [
            {
                "name": row[0],
                "description": row[1],
                "numberOfTravelers":row[2],
                "petsAllowed": row[3],
                "price": row[4],
                "review":row[5],
                "ownerName":next(
                    ownerTripsAlreadyPurchased[1] for ownerTripsAlreadyPurchased in ownersTripsAlreadyPurchased if str(ownerTripsAlreadyPurchased[0])== row[6]
                ),
                "ownerImage": next(
                    ownerTripsAlreadyPurchased[2] for ownerTripsAlreadyPurchased in ownersTripsAlreadyPurchased if str(ownerTripsAlreadyPurchased[0])== row[6]
                )
            }
            for row in tripsAlreadyPurchased
        ]
        cursorTrip.execute("select id from trips where session_token =%s",(session_token,))

        idTrip = cursorTrip.fetchone()
        tripExists= False if not idTrip[0] else True
        cursorTrip.execute(
            "select id, name, description, numberOfTravelers, petsAllowed, price, review, usersPurchased, session_token from trips where id= ANY(%s)", (starUser,)
        )
        trips = cursorTrip.fetchall()
        
        if not trips:
            trips =[]
        trip=[] 
        
        for idTrip in trips:
            cursor.execute(
                "select name, image_url from usersPousae where session_token =%s",
                (idTrip[8],)
            )
            ownerOfTheTrip= cursor.fetchone()
            trip.append(
                {
                    "id": idTrip[0],
                    "name":idTrip[1],
                    "description": idTrip[2],
                    "numberOfTravelers":idTrip[3],
                    "petsAllowed": idTrip[4],
                    "price":idTrip[5],
                    "review": idTrip[6],
                    "usersPurchased": idTrip[7],
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
            "favoriteTrips":trips,
            "tripsAlreadyPurchased":tripAlreadyPurchasedArray
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
