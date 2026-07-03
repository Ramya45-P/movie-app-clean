from sqlalchemy import Column, Integer, String
from app.database.db import Base

class Watchlist(Base):
    __tablename__ = "watchlist"

    id = Column(Integer, primary_key=True, index=True)
    movie_id = Column(String, index=True)
    movie_title = Column(String)
    poster = Column(String, nullable=True)
    genre = Column(String)
    rating = Column(String)
    user_id = Column(Integer)