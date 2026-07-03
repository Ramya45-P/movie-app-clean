from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import SessionLocal
from app.models.watchlist import Watchlist
from app.schemas.watchlist_schema import (
    WatchlistCreate,
    WatchlistResponse,
)

router = APIRouter(
    prefix="/watchlist",
    tags=["Watchlist"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=WatchlistResponse)
def add_watchlist(
    data: WatchlistCreate,
    db: Session = Depends(get_db)
):
    existing = db.query(Watchlist).filter(
        Watchlist.movie_id == data.movie_id,
        Watchlist.user_id == data.user_id
    ).first()

    if existing:
        return existing

    movie = Watchlist(
        movie_id=data.movie_id,
        movie_title=data.movie_title,
        poster=data.poster,
        genre=data.genre,
        rating=data.rating,
        user_id=data.user_id
    )

    db.add(movie)
    db.commit()
    db.refresh(movie)

    return movie


@router.get("/", response_model=list[WatchlistResponse])
def get_watchlist(
    db: Session = Depends(get_db)
):
    return db.query(Watchlist).all()


@router.delete("/{watchlist_id}")
def delete_watchlist(
    watchlist_id: int,
    db: Session = Depends(get_db)
):
    movie = db.query(Watchlist).filter(
        Watchlist.id == watchlist_id
    ).first()

    if not movie:
        raise HTTPException(
            status_code=404,
            detail="Movie not found in watchlist"
        )

    db.delete(movie)
    db.commit()

    return {
        "message": "Movie removed from watchlist"
    }