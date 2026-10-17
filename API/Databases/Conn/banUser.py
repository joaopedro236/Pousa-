import sqlite3

def connect_databaseBU():
    try:
        conn=sqlite3.connect("API/Databases/DB/dbBanUser.db")
        cursor=conn.cursor()
        return conn, cursor 
    except Exception:
        return {"Status":False, "Error": "Error database"}
