from pydantic import BaseModel, EmailStr

# --------------------
# REGISTER
# --------------------
class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    password: str


# --------------------
# LOGIN
# --------------------
class LoginSchema(BaseModel):
    email: EmailStr
    password: str


# --------------------
# RESPONSE
# --------------------
class UserResponse(BaseModel):
    id: int
    username: str | None = None
    email: EmailStr

    class Config:
        from_attributes = True