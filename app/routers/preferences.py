from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.user import User
from app.models.user_preference import UserPreference
from app.schemas.preference_schema import (
    PreferenceCreate,
    PreferenceResponse,
)
from app.security import get_current_user

router = APIRouter(
    prefix="/preferences",
    tags=["Preferences"],
)


@router.get("/", response_model=list[PreferenceResponse])
def get_preferences(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return (
        db.query(UserPreference)
        .filter(UserPreference.user_id == current_user.id)
        .all()
    )


@router.post("/", response_model=PreferenceResponse)
def add_preference(
    data: PreferenceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    existing = (
        db.query(UserPreference)
        .filter(
            UserPreference.user_id == current_user.id,
            UserPreference.genre == data.genre,
        )
        .first()
    )

    if existing:
        return existing

    preference = UserPreference(
        genre=data.genre,
        user_id=current_user.id,
    )

    db.add(preference)
    db.commit()
    db.refresh(preference)

    return preference


@router.delete("/{preference_id}")
def delete_preference(
    preference_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    preference = (
        db.query(UserPreference)
        .filter(
            UserPreference.id == preference_id,
            UserPreference.user_id == current_user.id,
        )
        .first()
    )

    if not preference:
        raise HTTPException(
            status_code=404,
            detail="Preference not found",
        )

    db.delete(preference)
    db.commit()

    return {
        "message": "Preference removed successfully"
    }