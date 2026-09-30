from pydantic import BaseModel
class items(BaseModel):
    name:str | None =None
    description:str|None = None
    price: float |None =None
    StartDate: str | None = None
    EndDate: str|None= None
    petsAllowed: str|None = None
    numberTravelers: int| None = None