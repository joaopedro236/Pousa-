from fastapi import APIRouter, Request
from ...Databases.Conn.trips import connect_database_trip
from ...Databases.Conn.users import connect_database
from ...Validation.Trip.buyTrip import buy_trip

router = APIRouter()


@router.post("/buyTrip")
def buy_trip(tripId: buy_trip, request: Request):
    connUser = None
    conn = None
    cursor = None
    cursorUser = None
    session_token_user = request.cookies.get("user_session_token")
    try:
        conn, cursor = connect_database_trip()
        connUser, cursorUser = connect_database()
        cursor.execute(
            "select price, session_token from trips where id = %s", (tripId.id,)
        )
        tripPrice = cursor.fetchone()
        if not tripPrice:
            return {"Status": False, "Error": "Not exists trip"}
        cursorUser.execute(
            "select money from usersPousae where session_token = %s",
            (session_token_user,),
        )
        userMoney = cursorUser.fetchone()
        if session_token_user == tripPrice[1]:
            return{'Status': False, 'Error': 'You cannot buy from your own restaurant.'}
        if not userMoney:
            return {"Status": False, "Error": "not exists user"}
        if userMoney[0] < tripPrice[0]:
            return {"Status": False, "Error": "The user does not have enough money."}
        cursorUser.execute(
            """update usersPousae    
                        set 
                            money= money - %s,
                            moneyalreadyspent = moneyalreadyspent + %s,
                            tripsTaken = tripsTaken + 1
                            where session_token = %s
                            """,
            (tripPrice[0], tripPrice[0], session_token_user),
        )
        cursorUser.execute(
            """update usersPousae    
                        set 
                            money= money + %s
                            where session_token = %s
                            """,
            (tripPrice[0], tripPrice[1]),
        )
        connUser.commit()
        cursor.execute(
            """
        update trips
            set
                usersPurchased = array_append(usersPurchased,%s)
                where session_token = %s""",
            (session_token_user, tripPrice[1]),
        )
        conn.commit()
        
        return{'Status': True}
    except Exception :
        return {"Status": False, "Error": 'An error ocorred'}
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
        if cursorUser:
            cursorUser.close()
        if connUser:
            connUser.close()
