from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import SessionLocal
from app.models.watchlist import Watchlist
from app.schemas.watchlist_schema import (
    WatchlistCreate,
    WatchlistResponse,
)

from app.models.user import User
from app.security import get_current_user

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
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    existing = db.query(Watchlist).filter(
        Watchlist.movie_id == data.movie_id,
        Watchlist.user_id == current_user.id
    ).first()

    if existing:
        return existing

    watchlist = Watchlist(
        movie_id=data.movie_id,
        user_id=current_user.id
    )

    db.add(watchlist)
    db.commit()
    db.refresh(watchlist)

    return watchlist


@router.get("/", response_model=list[WatchlistResponse])
def get_watchlist(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return db.query(Watchlist).filter(
        Watchlist.user_id == current_user.id
    ).all()


@router.delete("/{watchlist_id}")
def delete_watchlist(
    watchlist_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    movie = db.query(Watchlist).filter(
        Watchlist.id == watchlist_id,
        Watchlist.user_id == current_user.id
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