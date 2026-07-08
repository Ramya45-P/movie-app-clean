from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.user import User
from app.models.favorite import Favorite
from app.models.watched import Watched
from app.models.watchlist import Watchlist
from app.models.review import Review

from app.schemas.profile import (
    ProfileResponse,
    ProfileUpdate,
    ChangePasswordRequest,
    StatsResponse,
)

from app.security import (
    get_current_user,
    verify_password,
    get_password_hash,
)

router = APIRouter(prefix="/profile", tags=["Profile"])


# -------------------------
# GET PROFILE
# -------------------------
@router.get("/", response_model=ProfileResponse)
def get_profile(current_user: User = Depends(get_current_user)):
    return current_user


# -------------------------
# UPDATE PROFILE
# -------------------------
@router.put("/", response_model=ProfileResponse)
def update_profile(
    payload: ProfileUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    existing = (
        db.query(User)
        .filter(
            User.username == payload.username,
            User.id != current_user.id,
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Username already exists",
        )

    current_user.username = payload.username
    current_user.email = payload.email

    db.commit()
    db.refresh(current_user)

    return current_user


# -------------------------
# CHANGE PASSWORD
# -------------------------
@router.put("/change-password")
def change_password(
    payload: ChangePasswordRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    if not verify_password(
        payload.old_password,
        current_user.password,
    ):
        raise HTTPException(
            status_code=400,
            detail="Old password is incorrect",
        )

    if len(payload.new_password) < 6:
        raise HTTPException(
            status_code=400,
            detail="Password must be at least 6 characters",
        )

    current_user.password = get_password_hash(
        payload.new_password
    )

    db.commit()

    return {"message": "Password updated successfully"}


# -------------------------
# PROFILE STATS
# -------------------------
@router.get("/stats", response_model=StatsResponse)
def profile_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    try:
        watched_count = (
            db.query(Watched)
            .filter(Watched.user_id == current_user.id)
            .count()
        )

        favorites_count = (
            db.query(Favorite)
            .filter(Favorite.user_id == current_user.id)
            .count()
        )

        watchlist_count = (
            db.query(Watchlist)
            .filter(Watchlist.user_id == current_user.id)
            .count()
        )

        reviews_count = (
            db.query(Review)
            .filter(Review.user_id == current_user.id)
            .count()
        )

        return {
            "watched_count": watched_count,
            "favorites_count": favorites_count,
            "watchlist_count": watchlist_count,
            "reviews_count": reviews_count
        }

    except Exception as e:
        print("STATS ERROR:", e)
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )