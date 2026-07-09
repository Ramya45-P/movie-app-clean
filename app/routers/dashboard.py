from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func, desc

from app.database.db import get_db
from app.models.user import User
from app.models.watched import Watched
from app.models.favorite import Favorite
from app.models.watchlist import Watchlist
from app.models.review import Review
from app.models.search_history import SearchHistory
from app.models.movie import Movie
from app.security import get_current_user
from datetime import datetime, timedelta

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/")
def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    watched_count = (
        db.query(Watched)
        .filter(Watched.user_id == current_user.id)
        .count()
    )

    favorite_count = (
        db.query(Favorite)
        .filter(Favorite.user_id == current_user.id)
        .count()
    )

    watchlist_count = (
        db.query(Watchlist)
        .filter(Watchlist.user_id == current_user.id)
        .count()
    )

    review_count = (
        db.query(Review)
        .filter(Review.user_id == current_user.id)
        .count()
    )


    return {
        "watched": watched_count,
        "favorites": favorite_count,
        "watchlist": watchlist_count,
        "reviews": review_count
    }
    
@router.get("/genres")
def get_top_genres(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    genres = (
        db.query(
            Movie.genre,
            func.count(Movie.genre).label("count")
        )
        .join(Watched, Watched.movie_id == Movie.id)
        .filter(Watched.user_id == current_user.id)
        .group_by(Movie.genre)
        .order_by(desc("count"))
        .limit(5)
        .all()
    )

    return [
        {
            "genre": genre,
            "count": count
        }
        for genre, count in genres
    ]


@router.get("/monthly")
def get_monthly_activity(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    six_months_ago = datetime.utcnow() - timedelta(days=180)

    results = (
        db.query(
            func.strftime("%m", Watched.watched_at).label("month"),
            func.count(Watched.id).label("count")
        )
        .filter(
            Watched.user_id == current_user.id,
            Watched.watched_at >= six_months_ago
        )
        .group_by(func.strftime("%m", Watched.watched_at))
        .order_by(func.strftime("%m", Watched.watched_at))
        .all()
    )

    month_names = {
        "01": "Jan",
        "02": "Feb",
        "03": "Mar",
        "04": "Apr",
        "05": "May",
        "06": "Jun",
        "07": "Jul",
        "08": "Aug",
        "09": "Sep",
        "10": "Oct",
        "11": "Nov",
        "12": "Dec",
    }

    return [
        {
            "month": month_names.get(month, month),
            "count": count
        }
        for month, count in results
    ]

@router.get("/recent")
def get_recent_activity(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    recent_watched = (
        db.query(Watched, Movie)
        .join(Movie, Movie.id == Watched.movie_id)
        .filter(Watched.user_id == current_user.id)
        .order_by(Watched.watched_at.desc())
        .limit(5)
        .all()
    )

    recent_favorites = (
        db.query(Favorite, Movie)
        .join(Movie, Movie.id == Favorite.movie_id)
        .filter(Favorite.user_id == current_user.id)
        .order_by(Favorite.created_at.desc())
        .limit(5)
        .all()
    )

    recent_reviews = (
        db.query(Review, Movie)
        .join(Movie, Movie.id == Review.movie_id)
        .filter(Review.user_id == current_user.id)
        .order_by(Review.created_at.desc())
        .limit(5)
        .all()
    )

    return {
        "recent_watched": [
            {
                "title": movie.title,
                "poster": None,
                "watched_date": watched.watched_at,
            }
            for watched, movie in recent_watched
        ],
        "recent_favorites": [
            {
                "title": movie.title,
                "poster": None,
            }
            for favorite, movie in recent_favorites
        ],
        "recent_reviews": [
            {
                "movie_title": movie.title,
                "rating": review.rating,
                "created_at": review.created_at,
            }
            for review, movie in recent_reviews
        ],
    }