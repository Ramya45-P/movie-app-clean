from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import SessionLocal
from app.models.watched import Watched
from app.models.watchlist import Watchlist

from app.schemas.favorite_schema import (
    WatchedCreate,
    WatchedResponse,
)

router = APIRouter(
    prefix="/watched",
    tags=["Watched History"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -------------------------
# ADD WATCHED MOVIE
# -------------------------
@router.post("/", response_model=WatchedResponse)
def add_watched(
    data: WatchedCreate,
    db: Session = Depends(get_db)
):
    # Check if already exists
    existing = db.query(Watched).filter(
        Watched.movie_id == data.movie_id,
        Watched.user_id == data.user_id
    ).first()

    if existing:
        return existing

    # Save watched movie
    watched = Watched(
        movie_id=data.movie_id,
        movie_title=data.movie_title,
        poster=data.poster,
        genre=data.genre,
        rating=data.rating,
        watched_date=data.watched_date,
        user_id=data.user_id
    )

    db.add(watched)
    db.commit()
    db.refresh(watched)

    # Remove from watchlist if present
    watchlist_movie = db.query(Watchlist).filter(
        Watchlist.movie_id == data.movie_id,
        Watchlist.user_id == data.user_id
    ).first()

    if watchlist_movie:
        db.delete(watchlist_movie)
        db.commit()

    return watched

# -------------------------
# GET WATCHED MOVIES
# -------------------------
@router.get("/", response_model=list[WatchedResponse])
def get_watched(db: Session = Depends(get_db)):
    return db.query(Watched).all()


# -------------------------
# DELETE WATCHED MOVIE
# -------------------------
@router.delete("/{watched_id}")
def delete_watched(
    watched_id: int,
    db: Session = Depends(get_db)
):
    watched = db.query(Watched).filter(
        Watched.id == watched_id
    ).first()

    if not watched:
        raise HTTPException(
            status_code=404,
            detail="Watched movie not found"
        )

    db.delete(watched)
    db.commit()

    return {
        "message": "Watched movie deleted successfully"
    }