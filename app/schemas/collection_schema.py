from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class CollectionBase(BaseModel):
    name: str
    description: Optional[str] = None
    is_public: bool = False


class CollectionCreate(CollectionBase):
    pass


class CollectionUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    is_public: Optional[bool] = None


class CollectionResponse(CollectionBase):
    id: int
    user_id: int
    created_at: datetime

    class Config:
        from_attributes = True


class AddMovieRequest(BaseModel):
    movie_id: int


class CollectionMovieResponse(BaseModel):
    id: int
    title: str
    description: str | None = None
    genre: str
    rating: int

    class Config:
        from_attributes = True


class CollectionDetailsResponse(CollectionResponse):
    movies: list[CollectionMovieResponse] = []