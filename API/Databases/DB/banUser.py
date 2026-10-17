import sqlite3
from ..Conn.banUser import connect_databaseBU
def databaseBU():
    conn = None
    cursor= None
    try:
        conn, cursor = connect_databaseBU()
        cursor.execute("""create table if not exists bans (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ip TEXT NOT NULL UNIQUE, 
        reason TEXT,
        
    expires_at DATETIME DEFAULT CURRENT_TIMESTAMP)""")
        conn.commit()
        
    except Exception as e:
        return{"Status": False, "Error": "Error Database"}
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()
            
