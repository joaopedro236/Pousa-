from pydantic import BaseModel, EmailStr
class login(BaseModel):
    email: EmailStr
    cpf: int