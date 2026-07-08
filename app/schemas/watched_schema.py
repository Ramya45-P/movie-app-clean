from pydantic import BaseModel


class WatchedCreate(BaseModel):
    movie_id: int


class WatchedResponse(BaseModel):
    id: int
    user_id: int
    movie_id: int

    class Config:
        from_attributes = True