from pydantic import BaseModel

class FavoriteCreate(BaseModel):
    movie_id: int

class FavoriteResponse(BaseModel):
    id: int
    user_id: int
    movie_id: int

    class Config:
        from_attributes = True