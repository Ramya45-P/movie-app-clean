from sqlalchemy import Column, Integer, String
from app.database.db import Base

class Movie(Base):
    __tablename__ = "movies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    rating = Column(Integer)
    genre = Column(String)