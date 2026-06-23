from pydantic import BaseModel


# --------------------
# CREATE USER (REGISTER)
# --------------------
class UserCreate(BaseModel):
    username: str
    email: str
    password: str


# --------------------
# LOGIN USER
# --------------------
class LoginSchema(BaseModel):
    email: str
    password: str


# --------------------
# RESPONSE (optional but good)
# --------------------
class UserResponse(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        from_attributes = True