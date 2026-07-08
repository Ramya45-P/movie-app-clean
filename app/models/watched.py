from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.database.db import Base


class Watched(Base):
    __tablename__ = "watched"

    id = Column(Integer, primary_key=True)

    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    movie_id = Column(Integer, ForeignKey("movies.id", ondelete="CASCADE"))

    user = relationship("User", back_populates="watched")
    movie = relationship("Movie", back_populates="watched")