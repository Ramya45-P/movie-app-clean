from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from pathlib import Path



DATABASE_URL = "sqlite:///./movies.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

print("DATABASE URL:", DATABASE_URL)
print("DATABASE FILE:", Path(engine.url.database).resolve())

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()