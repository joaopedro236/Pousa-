from fastapi import APIRouter, Request
from ...Databases.Conn.banUser import connect_databaseBU
router = APIRouter()
@router.delete('/banBruteForce')
def banBF(request:Request):
    conn = None
    cursor= None
    try:
        url="https://pousa.vercel.app"
        origin = request.headers.get("origin")
        if url != origin:
            raise HTTPException(status_code=403, detail="Access denied")
        ip = request.client.host
        conn, cursor = connect_databaseBU()
        cursor.execute("""
                        insert into bans(ip, reason, expires_at) VALUES(?,?,datetime("now","+1 day"))
                        """,(str(ip),"Brute Force"))
        conn.commit()
        return{"Status":True, "Ban":"Brute Force Detected"}
    except HTTPException:
        raise
    except Exception:
        return{"Status":False, "Error": "An Error Occurred"}
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()