from pydantic import BaseModel, Field

class ReviewCreate(BaseModel):
    movie_id: int
    review: str = Field(..., min_length=1, max_length=500)
    rating: int = Field(..., ge=1, le=5)


class ReviewResponse(BaseModel):
    id: int
    movie_id: int
    review: str
    rating: int
    user_id: int

    class Config:
        from_attributes = True
