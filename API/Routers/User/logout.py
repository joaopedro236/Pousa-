from fastapi import APIRouter, Response

router = APIRouter()


@router.post("/logout")
def logout(response: Response):
    try:
        response.delete_cookie(
            key="user_session_token",
    )

        return {"Status": True}
    except Exception as e:
        return {"Status": false, "Error": str(e)}