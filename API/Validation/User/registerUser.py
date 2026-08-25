from pydantic import BaseModel ,EmailStr
class registerUser(BaseModel):
    name:str
    email:EmailStr
    password:str
    cpf: int
