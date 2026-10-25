from pydantic import BaseModel


class Trips(BaseModel):
    name: str
    description: str
    selected: dict
    numbertravelers: int
    petsAllowed: str
    price: float
    cep: str
