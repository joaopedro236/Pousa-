import sqlite3

def connect_databaseBU():
    try:
        conn = sqlite3.connect("API/Databases/DB/dbBanUser.db")
        cursor = conn.cursor()
        cursor.execute("""CREATE TABLE IF NOT EXISTS bans (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ip TEXT NOT NULL UNIQUE,
            reason TEXT,
            expires_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )""")
        conn.commit()
        return conn, cursor
    except Exception:
        return {"Status":False, "Error": "Error database"}
