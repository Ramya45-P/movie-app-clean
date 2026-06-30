from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from app.database.db import get_db
from app.models.user import User
from app.security import (
    verify_password,
    get_password_hash,
    create_access_token
)

router = APIRouter(prefix="/auth", tags=["Auth"])


# -------------------------
# REGISTER
# -------------------------
@router.post("/register")
def register(
    email: str,
    password: str,
    db: Session = Depends(get_db)
):
    existing_user = db.query(User).filter(User.email == email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_password = get_password_hash(password)

    new_user = User(
        email=email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created successfully"}


# -------------------------
# LOGIN (IMPORTANT FIX)
# -------------------------
@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.email == form_data.username).first()

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token(data={"sub": user.email})

    return {
        "access_token": token,
        "token_type": "bearer"
    }