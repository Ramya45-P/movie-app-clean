from collections import Counter

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.favorite import Favorite
from app.models.movie import Movie
from app.models.notification import Notification
from app.schemas.movie_schema import MovieResponse

router = APIRouter(
    prefix="/recommendations",
    tags=["Recommendations"]
)


@router.get("/", response_model=list[MovieResponse])
def get_recommendations(db: Session = Depends(get_db)):

    favorites = db.query(Favorite).all()

    if not favorites:
        return []

    genres = [fav.genre for fav in favorites]
    favorite_genre = Counter(genres).most_common(1)[0][0]

    recommendations = (
        db.query(Movie)
        .filter(Movie.genre == favorite_genre)
        .all()
    )

    notification = Notification(
        user_id=1,
        type="recommendation",
        message=f"New recommendations are available based on your favorite {favorite_genre} movies."
    )

    db.add(notification)
    db.commit()

    return recommendations