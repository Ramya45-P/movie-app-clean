from pydantic import BaseModel


class PreferenceCreate(BaseModel):
    genre: str


class PreferenceResponse(BaseModel):
    id: int
    genre: str
    user_id: int

    class Config:
        from_attributes = True