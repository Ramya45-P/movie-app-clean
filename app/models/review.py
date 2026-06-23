from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.database.db import Base


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)

    movie_id = Column(Integer, nullable=False)

    review = Column(String, nullable=False)

    rating = Column(Integer, nullable=False)

    user_id = Column(Integer, ForeignKey("users.id"))

    user = relationship(
        "User",
        back_populates="reviews"
    )