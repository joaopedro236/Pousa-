from fastapi import APIRouter, Request
router = APIRouter()
@router.get('/checkUser')
def checkCookie(request: Request):
    try:
        token = request.cookies.get("user_session_token")
        if token:
            return {"authenticated": True}

        return {"authenticated": False}
    except KeyError:
        return{'Error':'An error occurred while verifying the user.', "authenticated": False}