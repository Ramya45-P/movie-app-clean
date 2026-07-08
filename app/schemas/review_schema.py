from pydantic import BaseModel


class ReviewCreate(BaseModel):
    movie_id: int
    rating: int
    comment: str


class ReviewResponse(BaseModel):
    id: int
    user_id: int
    movie_id: int
    rating: int
    comment: str

    class Config:
        from_attributes = True