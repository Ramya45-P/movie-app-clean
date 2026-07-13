from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database.db import Base


class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String)
    description = Column(String)
    genre = Column(String)
    rating = Column(Integer)

   

    favorites = relationship("Favorite", back_populates="movie", cascade="all, delete-orphan")

    watched = relationship("Watched", back_populates="movie", cascade="all, delete-orphan")

    watchlist = relationship("Watchlist", back_populates="movie", cascade="all, delete-orphan")

    reviews = relationship("Review", back_populates="movie", cascade="all, delete-orphan")
    collection_movies = relationship(
    "CollectionMovie",
    back_populates="movie",
    cascade="all, delete-orphan"
)