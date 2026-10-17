import sqlite3
def connect_databaseBU():
    try:
        conn=sqlite3.connect("dbBanUser.db")
        cursor=conn.cursor()
    except Exception:
        return {"Status":False, "Error": "Error database"}