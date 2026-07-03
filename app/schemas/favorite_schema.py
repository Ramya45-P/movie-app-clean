from pydantic import BaseModel

class FavoriteCreate(BaseModel):
    movie_id: str
    movie_title: str
    genre: str


class FavoriteResponse(BaseModel):
    id: int
    movie_id: str
    movie_title: str
    genre: str

    class Config:
        from_attributes = True

class WatchedCreate(BaseModel):
    movie_id: str
    movie_title: str
    poster: str | None = None
    genre: str
    rating: str
    watched_date: str
    user_id: int


class WatchedResponse(BaseModel):
    id: int
    movie_id: str
    movie_title: str
    poster: str | None = None
    genre: str
    rating: str
    watched_date: str
    user_id: int

    class Config:
        from_attributes = True