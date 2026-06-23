from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime

from app.database.db import Base


class SearchHistory(Base):
    __tablename__ = "search_history"

    id = Column(Integer, primary_key=True, index=True)

    keyword = Column(String, nullable=False)

    searched_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    user = relationship(
        "User",
        back_populates="searches"
    )