from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import SessionLocal
from app.models.watched import Watched
from app.models.watchlist import Watchlist
from app.models.user import User

from app.schemas.watched_schema import (
    WatchedCreate,
    WatchedResponse
)

from app.security import get_current_user


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
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    existing = db.query(Watched).filter(
        Watched.movie_id == data.movie_id,
        Watched.user_id == current_user.id
    ).first()

    if existing:
        return existing

    watched = Watched(
        movie_id=data.movie_id,
        user_id=current_user.id
    )

    db.add(watched)
    db.commit()
    db.refresh(watched)

    # Remove from watchlist
    watchlist_movie = db.query(Watchlist).filter(
        Watchlist.movie_id == data.movie_id,
        Watchlist.user_id == current_user.id
    ).first()

    if watchlist_movie:
        db.delete(watchlist_movie)
        db.commit()

    return watched


# -------------------------
# GET WATCHED MOVIES
# -------------------------
@router.get("/", response_model=list[WatchedResponse])
def get_watched(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return db.query(Watched).filter(
        Watched.user_id == current_user.id
    ).all()


# -------------------------
# DELETE WATCHED MOVIE
# -------------------------
@router.delete("/{watched_id}")
def delete_watched(
    watched_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    watched = db.query(Watched).filter(
        Watched.id == watched_id,
        Watched.user_id == current_user.id
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