from pydantic import BaseModel
class Trips(BaseModel):
    name: str
    destination:str
    startDate: str
    endDate:str
    numbertravelers:int
    petsAllowed: str
    price: float