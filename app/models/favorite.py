from sqlalchemy import Column, Integer, String
from app.database.db import Base

class Favorite(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, index=True)
    movie_id = Column(String)
    movie_title = Column(String)
    genre = Column(String)