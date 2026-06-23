from pydantic import BaseModel


class MovieCreate(BaseModel):
    title: str
    description: str
    rating: int
    genre: str


class MovieResponse(BaseModel):
    id: int
    title: str
    description: str
    rating: int
    genre: str

    class Config:
        from_attributes = True


class MovieUpdate(BaseModel):
    title: str
    description: str
    rating: float
    genre: str


class MovieBulkUpdate(BaseModel):
    id: int
    title: str
    description: str
    rating: float
    genre: str

    class Config:
        from_attributes = True