print("RECOMMENDATIONS ROUTE LOADED")
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from collections import Counter

from app.database.db import SessionLocal
from app.models.movie import Movie
from app.models.favorite import Favorite

router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"]
 )

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def get_recommendations(db: Session = Depends(get_db)):

    favorites = db.query(Favorite).all()

    if not favorites:
        return {
            "recommended_movies": [],
            "message": "Start adding favorites to get recommendations"
        }

    genres = [fav.genre for fav in favorites]

    favorite_genre = Counter(genres).most_common(1)[0][0]

    recommendations = (
        db.query(Movie)
        .filter(Movie.genre == favorite_genre)
        .all()
    )

    return {
        "recommended_movies": recommendations
    }