from pydantic import BaseModel
class Trips(BaseModel):
    name: str
    description:str
    startDate: str
    endDate:str
    numbertravelers:int
    petsAllowed: str
    price: float
    tags: list