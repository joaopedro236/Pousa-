import psycopg2


def release_database(conn, cursor, pool):
    try:
        if cursor and not cursor.closed:
            cursor.close()
    finally:
        try:
            if conn and not conn.closed:
                conn.rollback()
        finally:
            if conn and not conn.closed:
                pool.putconn(conn)
