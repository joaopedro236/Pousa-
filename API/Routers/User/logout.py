from fastapi import APIRouter, Response
router = APIRouter()
@router.post("/logout")

def logout(response: Response):
    try:
        response.delete_cookie(
        key="user_session_token",
        path="/",
        samesite="none",
        secure=True,
    )

        return {"Status": True}
    except Exception as e:
        return{"Status": False, "Error": str(e)}