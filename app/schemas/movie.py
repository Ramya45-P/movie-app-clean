from pydantic import BaseModel


class MovieCreate(BaseModel):
    title: str
    description: str
    genre: str
    rating: int


class MovieUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    genre: str | None = None
    rating: int | None = None


class MovieResponse(BaseModel):
    id: int
    title: str
    description: str
    genre: str
    rating: int

    class Config:
        from_attributes = True