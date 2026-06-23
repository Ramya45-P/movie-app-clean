from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from pydantic import BaseModel

from app.database.db import get_db
from app.models.user import User
from app.auth_utils import create_access_token

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# -------------------------
# Schemas
# -------------------------
class UserCreate(BaseModel):
    username: str
    email: str
    password: str


class UserLogin(BaseModel):
    email: str
    password: str


# -------------------------
# REGISTER
# -------------------------
@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = pwd_context.hash(user.password)

    new_user = User(
        username=user.username,
        email=user.email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully"}


# -------------------------
# LOGIN (JWT ENABLED)
# -------------------------
@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    print("JWT LOGIN FUNCTION ACTIVE")  # DEBUG

    db_user = db.query(User).filter(User.email == user.email).first()

if not db_user:
    raise HTTPException(status_code=404, detail="User not found")

# DEBUG
print("Entered password:", user.password)
print("Entered password length:", len(user.password))
print("DB password:", db_user.password)
print("DB password length:", len(db_user.password))

if not pwd_context.verify(user.password, db_user.password):
    raise HTTPException(status_code=400, detail="Invalid credentials")

    access_token = create_access_token(
        data={"sub": db_user.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }