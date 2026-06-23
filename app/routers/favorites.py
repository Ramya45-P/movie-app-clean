from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import SessionLocal
from app.models.favorite import Favorite
from app.schemas.favorite_schema import (
    FavoriteCreate,
    FavoriteResponse,
)

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


# -------------------------
# ADD FAVORITE
# -------------------------
@router.post("/", response_model=FavoriteResponse)
def add_favorite(
    data: FavoriteCreate,
    db: Session = Depends(get_db)
):
    # Check if already exists
    existing = db.query(Favorite).filter(
        Favorite.movie_id == data.movie_id
    ).first()

    if existing:
        return existing

    favorite = Favorite(
        movie_id=data.movie_id,
        movie_title=data.movie_title,
        genre=data.genre
    )

    db.add(favorite)
    db.commit()
    db.refresh(favorite)

    return favorite


# -------------------------
# GET ALL FAVORITES
# -------------------------
@router.get("/", response_model=list[FavoriteResponse])
def get_favorites(db: Session = Depends(get_db)):
    return db.query(Favorite).all()


# -------------------------
# DELETE FAVORITE
# -------------------------
@router.delete("/{favorite_id}")
def delete_favorite(
    favorite_id: int,
    db: Session = Depends(get_db)
):
    favorite = db.query(Favorite).filter(
        Favorite.id == favorite_id
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