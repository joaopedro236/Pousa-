import psycopg2


def release_database(conn, cursor):
    try:
        cursor.close()
    finally:
        try:
            if not conn.closed:
                conn.rollback()
        finally:
            pool.putconn(conn)
