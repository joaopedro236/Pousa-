import os
import psycopg2
from dotenv import load_dotenv
load_dotenv(encoding='utf-8')
DB_HOST = os.getenv('DB_HOST_TRIP')
DB_PORT = os.getenv('DB_PORT_TRIP')
DB_NAME = os.getenv('DB_NAME_TRIP')
DB_USER = os.getenv('DB_USER_TRIP')
DB_PASSWORD = os.getenv('DB_PASSWORD_TRIP')
def connect_database_trip():
    try:
        conn = psycopg2.connect(
            host=DB_HOST,
            port=DB_PORT,
            dbname=DB_NAME,
            user=DB_USER,
            password=DB_PASSWORD,
            sslmode="require"
        )
        cursor = conn.cursor()
        return conn, cursor
    except Exception as e:
        raise Exception(f'Database Error: {e}')