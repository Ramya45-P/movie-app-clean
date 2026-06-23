from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database.db import SessionLocal
from app.models.review import Review
from app.schemas.review import ReviewCreate, ReviewResponse
from app.utils.auth import get_current_user

router = APIRouter(tags=["Reviews"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# CREATE REVIEW
@router.post("/", response_model=ReviewResponse, status_code=status.HTTP_201_CREATED)
def add_review(
    review: ReviewCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    if not review.review.strip():
        raise HTTPException(status_code=400, detail="Review cannot be empty")

    if review.rating < 1 or review.rating > 5:
        raise HTTPException(status_code=400, detail="Rating must be 1–5")

    new_review = Review(
        movie_id=review.movie_id,
        review=review.review,
        rating=review.rating,
        user_id=current_user.id
    )

    db.add(new_review)
    db.commit()
    db.refresh(new_review)
    return new_review


# GET REVIEWS OF A MOVIE
@router.get("/movie/{movie_id}", response_model=list[ReviewResponse])
def get_reviews(movie_id: int, skip: int = 0, limit: int = 5, db: Session = Depends(get_db)):
    return (
        db.query(Review)
        .filter(Review.movie_id == movie_id)
        .offset(skip)
        .limit(limit)
        .all()
    )


# UPDATE REVIEW
@router.put("/{review_id}", response_model=ReviewResponse)
def update_review(
    review_id: int,
    updated_review: ReviewCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    review = db.query(Review).filter(Review.id == review_id).first()

    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    if review.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not allowed")

    review.movie_id = updated_review.movie_id
    review.review = updated_review.review
    review.rating = updated_review.rating

    db.commit()
    db.refresh(review)
    return review


# DELETE REVIEW
@router.delete("/{review_id}")
def delete_review(
    review_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    review = db.query(Review).filter(Review.id == review_id).first()

    if not review:
        raise HTTPException(status_code=404, detail="Review not found")

    if review.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not allowed")

    db.delete(review)
    db.commit()
    return {"message": "Review deleted"}


# AVERAGE RATING
@router.get("/average/{movie_id}")
def average_rating(movie_id: int, db: Session = Depends(get_db)):
    avg = db.query(func.avg(Review.rating)).filter(Review.movie_id == movie_id).scalar()
    return {
        "movie_id": movie_id,
        "average_rating": round(avg or 0, 1)
    }