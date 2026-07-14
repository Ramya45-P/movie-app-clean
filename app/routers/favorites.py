from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.orm import joinedload

from app.database.db import SessionLocal
from app.models.favorite import Favorite
from app.schemas.favorite_schema import (
    FavoriteCreate,
    FavoriteResponse
)

from app.models.user import User
from app.security import get_current_user

router = APIRouter(
    prefix="/favorites",
    tags=["Favorites"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()



# ADD FAVORITE
@router.post("/", response_model=FavoriteResponse)
def add_favorite(
    data: FavoriteCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    existing = db.query(Favorite).filter(
        Favorite.movie_id == data.movie_id,
        Favorite.user_id == current_user.id
    ).first()


    if existing:
        return existing


    favorite = Favorite(
        movie_id=data.movie_id,
        user_id=current_user.id
    )


    db.add(favorite)
    db.commit()
    db.refresh(favorite)

    return favorite



# GET FAVORITES
@router.get("/", response_model=list[FavoriteResponse])
def get_favorites(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Favorite).filter(
        Favorite.user_id == current_user.id
    ).all()

# DELETE FAVORITE
@router.delete("/{favorite_id}")
def delete_favorite(
    favorite_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    favorite = db.query(Favorite).filter(
        Favorite.id == favorite_id,
        Favorite.user_id == current_user.id
    ).first()


    if not favorite:
        raise HTTPException(
            status_code=404,
            detail="Favorite not found"
        )


    db.delete(favorite)
    db.commit()


    return {
        "message": "Favorite deleted successfully"
    }