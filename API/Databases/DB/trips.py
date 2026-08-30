from ..Conn.trips import connect_database


def database():
    conn = None
    cursor = None
    try:
        conn, cursor = connect_database()
        cursor.execute("""
        create table if not exists trips(
        id serial primary key,
        name text,
        destination text,
        startDate text,
        endDate text,
        numberOfTravelers integer,
        petsAllowed text,
         price DECIMAL(10,2),
         session_token uuid""")
        conn.commit()
    except Exception:
           return {"Status": False, "Error": "Error Create Database"}
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
