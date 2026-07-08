from pydantic import BaseModel, EmailStr


class ProfileResponse(BaseModel):
    id: int
    username: str | None = None
    email: EmailStr

    class Config:
        from_attributes = True


class ProfileUpdate(BaseModel):
    username: str
    email: EmailStr


class ChangePasswordRequest(BaseModel):
    old_password: str
    new_password: str


class StatsResponse(BaseModel):
    watched_count: int
    favorites_count: int
    watchlist_count: int
    reviews_count: int