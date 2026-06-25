from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.db import get_db
from app.models.notification import Notification

router = APIRouter(
    prefix="/notifications",
    tags=["Notifications"]
)


@router.get("/")
def get_notifications(db: Session = Depends(get_db)):
    notifications = (
        db.query(Notification)
        .order_by(Notification.created_at.desc())
        .all()
    )

    return notifications

@router.get("/unread-count")
def unread_count(db: Session = Depends(get_db)):
    count = (
        db.query(Notification)
        .filter(Notification.is_read == False)
        .count()
    )

    return {"unread_count": count}

@router.patch("/{notification_id}/read")
def mark_as_read(notification_id: int, db: Session = Depends(get_db)):
    notification = (
        db.query(Notification)
        .filter(Notification.id == notification_id)
        .first()
    )

    if not notification:
        raise HTTPException(
            status_code=404,
            detail="Notification not found"
        )

    notification.is_read = True

    db.commit()
    db.refresh(notification)

    return {
        "message": "Notification marked as read"
    }
