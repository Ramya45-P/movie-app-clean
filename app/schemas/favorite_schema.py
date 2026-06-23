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