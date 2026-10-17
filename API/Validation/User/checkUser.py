from fastapi import APIRouter, Request
from ...Databases.Conn.banUser import connect_databaseBU
router = APIRouter()
@router.get('/checkUser')
def checkCookie(request: Request):
    connBU = None
    cursorBU = None
    try:
        connBU, cursorBU = connect_databaseBU()
        ip = request.client.host
        if not ip:
            return{"Status":False, "Error":"Not Ip"}
        cursorBU.execute("select expires_at <= current_timestamp, reason from bans where ip = ?",(ip,))
        result = cursorBU.fetchone()
        if result is not None:
            expired, reason = result
            if expired:
                cursorBU.execute("delete from bans where ip = ?",(ip,))
                connBU.commit()
            else:
                return{"authenticated": False, "Error":"Ban Detected","Reason": reason}
        token = request.cookies.get("user_session_token")
        if token:
            return {"authenticated": True}

        return {"authenticated": False}
    except KeyError:
        return{'Error':'An error occurred while verifying the user.', "authenticated": False}
    except Exception:
                return{'Error':'An error occurred ', "authenticated": False}
    finally:
        if cursorBU:
            cursorBU.close()
        if connBU:
            connBU.close()