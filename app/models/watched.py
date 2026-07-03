from sqlalchemy import Column, Integer, String
from app.database.db import Base

class Watched(Base):
    __tablename__ = "watched"

    id = Column(Integer, primary_key=True, index=True)
    movie_id = Column(String, index=True)
    movie_title = Column(String)
    poster = Column(String, nullable=True)
    genre = Column(String)
    rating = Column(String)
    watched_date = Column(String)
    user_id = Column(Integer)