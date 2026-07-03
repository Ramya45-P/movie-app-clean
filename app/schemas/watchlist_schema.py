from pydantic import BaseModel

class WatchlistCreate(BaseModel):
    movie_id: str
    movie_title: str
    poster: str | None = None
    genre: str
    rating: str
    user_id: int


class WatchlistResponse(BaseModel):
    id: int
    movie_id: str
    movie_title: str
    poster: str | None = None
    genre: str
    rating: str
    user_id: int

    class Config:
        from_attributes = True