from ..Conn.users import connect_database

def database():
    conn=None
    cursor=None
    try:
        conn,cursor = connect_database()
        cursor.execute("""create table if not exists usersPousae(
        id serial primary key,
        name varchar(150)  not null,
        email  varchar(254) not null,
        password  varchar(255) not null,
        session_token UUID,
        money numeric(10,2 ) default 1000.00, 
        cpf varchar(14) not null ,
        image_url text,
        moneyalreadyspent numeric(10,2) default 0.0,
        tripsTaken integer default 0,
        purchasedTrips int[],
        star int[] default null,
        moneyobtained numeric(10,2)  DEFAULT 0,
        tripsobtained int  default 0,
        tripsobtainedhistoryS numeric(10,2)[] default ARRAY[0,0,0,0,0,0,0],
        last_week INT""")
        conn.commit()
    except Exception:
        if conn:
            conn.rollback()

        return {
            "status": False,
            "error": "Erro Database"
        }

    finally:
        if cursor:
            cursor.close()

        if conn:
            conn.close()