import psycopg2


def release_database(conn, cursor):
    try:
        if cursor:
            cursor.close()

            if conn:
                if not conn.closed:
                    pool.putconn(conn)
    except Exception:
        if conn:
            pool.putconn(conn, close=True)
            raise
