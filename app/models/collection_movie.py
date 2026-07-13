from sqlalchemy import Column, Integer, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship

from app.database.db import Base


class CollectionMovie(Base):
    __tablename__ = "collection_movies"

    id = Column(Integer, primary_key=True, index=True)

    collection_id = Column(
        Integer,
        ForeignKey("collections.id"),
        nullable=False
    )

    movie_id = Column(
        Integer,
        ForeignKey("movies.id"),
        nullable=False
    )

    collection = relationship(
        "Collection",
        back_populates="collection_movies"
    )

    movie = relationship(
        "Movie",
        back_populates="collection_movies"
    )

    __table_args__ = (
        UniqueConstraint(
            "collection_id",
            "movie_id",
            name="unique_collection_movie"
        ),
    )