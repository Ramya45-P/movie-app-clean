from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List

from app.database.db import get_db
from app.models.movie import Movie
from app.models.review import Review
from app.security import get_current_user
from app.schemas.movie_schema import (
    MovieCreate,
    MovieResponse,
    MovieUpdate,
    MovieBulkUpdate
)

router = APIRouter(
    prefix="/movies",
    tags=["Movies"]
)

# -------------------------
# CREATE MOVIE
# -------------------------
@router.post("/", response_model=MovieResponse)
def create_movie(movie: MovieCreate, db: Session = Depends(get_db)):

    existing = db.query(Movie).filter(Movie.title == movie.title).first()
    if existing:
        raise HTTPException(status_code=400, detail="Movie already exists")

    new_movie = Movie(**movie.dict())
    db.add(new_movie)
    db.commit()
    db.refresh(new_movie)

    return new_movie


# -------------------------
# GET ALL MOVIES
# -------------------------
@router.get("/", response_model=List[MovieResponse])
def get_movies(
    db: Session = Depends(get_db),
    current_user: str = Depends(get_current_user)
):
    return db.query(Movie).all()

# -------------------------
# COMPARE MOVIES
# -------------------------
@router.get("/compare")
def compare_movies(
    movie1: int,
    movie2: int,
    db: Session = Depends(get_db)
):
    movie_one = db.query(Movie).filter(Movie.id == movie1).first()
    movie_two = db.query(Movie).filter(Movie.id == movie2).first()

    if not movie_one or not movie_two:
        raise HTTPException(
            status_code=404,
            detail="One or both movies not found"
        )

    def get_movie_details(movie):
        average_rating = (
            db.query(func.avg(Review.rating))
            .filter(Review.movie_id == movie.id)
            .scalar()
        )

        total_reviews = (
            db.query(func.count(Review.id))
            .filter(Review.movie_id == movie.id)
            .scalar()
        )

        return {
            "id": movie.id,
            "title": movie.title,
            "description": movie.description,
            "genre": movie.genre,
            "imdb_rating": movie.rating,
            "average_user_rating": round(float(average_rating), 2) if average_rating else 0,
            "total_reviews": total_reviews,
        }

    return {
        "movie1": get_movie_details(movie_one),
        "movie2": get_movie_details(movie_two)
    }    


# -------------------------
# GET SINGLE MOVIE
# -------------------------
@router.get("/{movie_id}", response_model=MovieResponse)
def get_movie(movie_id: int, db: Session = Depends(get_db)):

    movie = db.query(Movie).filter(Movie.id == movie_id).first()

    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")

    return movie

# -------------------------
# DELETE MOVIE
# -------------------------
@router.delete("/{movie_id}")
def delete_movie(movie_id: int, db: Session = Depends(get_db)):

    movie = db.query(Movie).filter(Movie.id == movie_id).first()

    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")

    db.delete(movie)
    db.commit()

    return {"message": "Movie deleted successfully"}

# -------------------------
# BULK UPDATE (MUST BE FIRST)
# -------------------------
@router.put("/bulk")
def bulk_update_movies(
    movies: List[MovieBulkUpdate],
    db: Session = Depends(get_db)
):
    updated_count = 0
    not_found_ids = []

    for item in movies:
        movie = db.query(Movie).filter(Movie.id == item.id).first()

        if not movie:
            not_found_ids.append(item.id)
            continue

        movie.title = item.title
        movie.description = item.description
        movie.rating = item.rating
        movie.genre = item.genre

        updated_count += 1

    db.commit()

    return {
        "message": "Bulk update completed",
        "updated_count": updated_count,
        "not_found_ids": not_found_ids
    }




# -------------------------
# SINGLE UPDATE (AFTER BULK)
# -------------------------
@router.put("/{movie_id}")
def update_movie(movie_id: int, updated: MovieUpdate, db: Session = Depends(get_db)):
    movie = db.query(Movie).filter(Movie.id == movie_id).first()

    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")

    movie.title = updated.title
    movie.description = updated.description
    movie.rating = updated.rating
    movie.genre = updated.genre

    db.commit()
    db.refresh(movie)

    return movie
