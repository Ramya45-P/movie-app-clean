from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import SessionLocal
from app.models.movie import Movie
from app.schemas.movie_schema import MovieCreate, MovieResponse

router = APIRouter(prefix="/movies", tags=["Movies"])

# DB dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# CREATE
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


# READ ALL
@router.get("/", response_model=list[MovieResponse])
def get_movies(db: Session = Depends(get_db)):
    return db.query(Movie).all()


# READ BY ID
@router.get("/{movie_id}", response_model=MovieResponse)
def get_movie(movie_id: int, db: Session = Depends(get_db)):
    movie = db.query(Movie).filter(Movie.id == movie_id).first()
    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")
    return movie


# UPDATE
@router.put("/{movie_id}", response_model=MovieResponse)
def update_movie(movie_id: int, updated: MovieCreate, db: Session = Depends(get_db)):

    movie = db.query(Movie).filter(Movie.id == movie_id).first()

    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")

    movie.title = updated.title
    movie.description = updated.description
    movie.rating = updated.rating

    db.commit()
    db.refresh(movie)
    return movie


# DELETE
@router.delete("/{movie_id}")
def delete_movie(movie_id: int, db: Session = Depends(get_db)):

    movie = db.query(Movie).filter(Movie.id == movie_id).first()

    if not movie:
        raise HTTPException(status_code=404, detail="Movie not found")

    db.delete(movie)
    db.commit()

    return {"message": "Movie deleted successfully"}