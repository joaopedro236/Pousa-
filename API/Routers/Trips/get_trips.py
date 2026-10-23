from fastapi import APIRouter
from ...Databases.Conn.users import connect_database
from ...Databases.Conn.trips import connect_database_trip
from ...Databases.Conn.release_database import release_database

router = APIRouter()


@router.get("/getTrips")
def get_trips():
    conn = None
    cursor = None
    connUser = None
    cursorUser = None
    try:
        conn, cursor = connect_database_trip()
        connUser, cursorUser = connect_database()
        cursor.execute("""
    SELECT t.name, t.description,
           t.numberOfTravelers, t.petsAllowed, t.price,
           u.name, u.image_url, t.session_token, t.review, 
           t.id, t.cep, t.street, t.complement,t.neighborhood, t.city, t.state, t.state_code, t.region, t.ibge, t.areacode, t.siafi, t.selected,t.img_main_url
    FROM trips t
    LEFT JOIN usersPousae u
    ON t.session_token = u.session_token
""")
        result = cursor.fetchall()
        trips = []
        for trip in result:
            cursorUser.execute(
                "select name, image_url from usersPousae where session_token = %s",
                (trip[7],),
            )
            resultUser = cursorUser.fetchone()

            trips.append(
                {
                    "name": trip[0],
                    "description": trip[1],
                    "numberOfTravelers": trip[2],
                    "petsAllowed": trip[3],
                    "price": trip[4],
                    "ownerName": resultUser[0] if resultUser else None,
                    "ownerImage": resultUser[1] if resultUser else None,
                    "review": trip[8],
                    "id": trip[9],
                    "cep": trip[10],
                    "street": trip[11] if trip else None,
                    "complement": trip[12] if trip else None,
                    "neighborhood": trip[13] if trip else None,
                    "city": trip[14] if trip else None,
                    "state": trip[15] if trip else None,
                    "state_code": trip[16] if trip else None,
                    "region": trip[17] if trip else None,
                    "ibge": trip[18] if trip else None,
                    "areacode": trip[19] if trip else None,
                    "siafi": trip[20] if trip else None,
                    "selected": trip[21],
                    "img_main_url": trip[22],
                }
            )

        return {"Status": True, "trips": trips}
    except Exception as e:
        return {"Status": False, "Error": "An error occurred"}
    finally:
        release_database(conn, cursor)
        release_database(connUser, cursorUser)
