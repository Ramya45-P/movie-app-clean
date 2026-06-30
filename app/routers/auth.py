from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from app.database.db import get_db
from app.models.user import User
from app.security import verify_password, get_password_hash, create_access_token

router = APIRouter()

# -------------------------
# REGISTER
# -------------------------
@router.post("/register")
def register(email: str, password: str, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter(User.email == email).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="User already exists"
        )

    hashed_password = get_password_hash(password)

    new_user = User(
        email=email,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User created successfully"
    }


# -------------------------
# LOGIN (FIXED VERSION)
# -------------------------
@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    # IMPORTANT: username field = email in your frontend
    user = db.query(User).filter(User.email == form_data.username).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    if not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    # create JWT token
    access_token = create_access_token(
        data={"sub": user.email},
        expires_delta=timedelta(days=7)
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }