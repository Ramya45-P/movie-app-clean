from pydantic import BaseModel
from datetime import datetime

class SearchHistoryResponse(BaseModel):
    id: int
    user_id: int
    keyword: str
    timestamp: datetime

    class Config:
        from_attributes = True