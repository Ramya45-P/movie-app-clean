from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from sqlalchemy import func

from app.database.db import SessionLocal
from app.models.search_history import SearchHistory
from app.schemas.search_history import SearchHistoryResponse
from app.utils.auth import get_current_user

router = APIRouter(tags=["History"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# SAVE SEARCH HISTORY
@router.post("/")
def add_search_history(
    keyword: str,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    history = SearchHistory(
        user_id=current_user.id,
        keyword=keyword,
        timestamp=datetime.utcnow()
    )

    db.add(history)
    db.commit()
    db.refresh(history)

    return {
        "message": "Search saved",
        "keyword": keyword
    }


# GET SEARCH HISTORY
@router.get("/", response_model=list[SearchHistoryResponse])
def get_history(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    return (
        db.query(SearchHistory)
        .filter(SearchHistory.user_id == current_user.id)
        .order_by(SearchHistory.timestamp.desc())
        .all()
    )


# ⭐ BONUS: TRENDING SEARCHES
@router.get("/trending")
def trending_searches(db: Session = Depends(get_db)):
    results = (
        db.query(
            SearchHistory.keyword,
            func.count(SearchHistory.keyword).label("count")
        )
        .group_by(SearchHistory.keyword)
        .order_by(func.count(SearchHistory.keyword).desc())
        .limit(5)
        .all()
    )

    return [
        {"keyword": r.keyword, "count": r.count}
        for r in results
    ]