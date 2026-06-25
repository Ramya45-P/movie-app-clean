from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.database.db import Base

from app.models.review import Review
from app.models.search_history import SearchHistory


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String, unique=True, nullable=False)

    email = Column(String, unique=True, nullable=False)

    password = Column(String, nullable=False)

    role = Column(String, default="user")

    searches = relationship(
        "SearchHistory",
        back_populates="user"
    )

    reviews = relationship(
        "Review",
        back_populates="user"
    )

    # NEW
    notifications = relationship(
        "Notification",
        back_populates="user",
        cascade="all, delete-orphan"
    )