from pydantic import BaseModel, EmailStr


class validation(BaseModel):
    message: str
    nameUser: str

    nameTrip: str | None = None
    descriptionTrip: str | None = None
    reviewTrip: float | None = None
    priceTrip: float | None = None

    petsTrip: str | None = None
    travelersTrip: int | None = None
    ownerTrip: int | None = None
    quantityMensage: int | None = None
