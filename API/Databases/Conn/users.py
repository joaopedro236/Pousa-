import os
import psycopg2
from dotenv import load_dotenv
from psycopg2.pool import ThreadedConnectionPool

load_dotenv(encoding="utf-8")
pool = ThreadedConnectionPool(
    minconn=1,
    maxconn=10,
    host=os.getenv("DB_HOST"),
    port=os.getenv("DB_PORT"),
    dbname=os.getenv("DB_NAME"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    sslmode="require",
)


def connect_database():
    conn = poll.getconn()
    try:

        cursor = conn.cursor()
        return conn, cursor
    except Exception as e:
        raise Exception(f"Database Error: {e}")
