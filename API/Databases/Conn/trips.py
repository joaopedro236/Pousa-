import os
import psycopg2
from dotenv import load_dotenv
from psycopg2.pool import ThreadedConnectionPool

load_dotenv(encoding="utf-8")

pool = ThreadedConnectionPool(
    minconn=1,
    maxconn=5,
    host=os.getenv("DB_HOST_TRIP"),
    port=os.getenv("DB_PORT_TRIP"),
    dbname=os.getenv("DB_NAME_TRIP"),
    user=os.getenv("DB_USER_TRIP"),
    password=os.getenv("DB_PASSWORD_TRIP"),
    sslmode="require",
)


def connect_database_trip():

    conn = pool.getconn()
    try:
        cursor = conn.cursor()
        return conn, cursor
    except Exception as e:
        raise Exception(f"Database Error: {e}")
