from sqlalchemy import text
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.db import Base, engine


# models imports...
# router imports...


app = FastAPI(
    title="Movie App API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://localhost:3003"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# CREATE TABLES + MIGRATIONS
@app.on_event("startup")
def startup():
    Base.metadata.create_all(bind=engine)

    migrations = [
        "ALTER TABLE watched ADD COLUMN watched_at DATETIME",
        "ALTER TABLE favorites ADD COLUMN created_at DATETIME",
    ]

    with engine.connect() as conn:
        for migration in migrations:
            try:
                conn.execute(text(migration))
                conn.commit()
                print("Migration applied:", migration)

            except Exception as e:
                print("Migration skipped:", e)