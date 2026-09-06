from ..Conn.trips import connect_database_trip


def database():
    conn = None
    cursor = None
    try:
        conn, cursor = connect_database_trip()
        cursor.execute("""
        create table if not exists trips(
        id serial primary key,
        name text,
        description text,
        startDate text,
        endDate text,
        numberOfTravelers integer,
        petsAllowed text,
         price DECIMAL(10,2),
         session_token uuid,
        review numeric(3,2) default 5,
        usersPurchased uuid[]""")
        conn.commit()
    except Exception:
        return {"Status": False, "Error": "Error Create Database"}
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
