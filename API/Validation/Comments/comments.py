from pydantic import BaseModel
class comment(BaseModel):
    comment: str
    note: int
    tripId: int