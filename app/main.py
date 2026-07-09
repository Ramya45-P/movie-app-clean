from sqlalchemy import text
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.db import Base, engine

# Models (IMPORTANT: register all models)
from app.models.user import User
from app.models.movie import Movie
from app.models.favorite import Favorite
from app.models.watched import Watched
from app.models.watchlist import Watchlist
from app.models.review import Review
from app.models.notification import Notification
from app.models.user_preference import UserPreference


# Routers
from app.routers import auth
from app.routers import movies
from app.routers import favorites
from app.routers import recommendations
from app.routers import notifications
from app.routers import profile
from app.routers import dashboard

from app.routers.watched import router as watched_router
from app.routers.watchlist import router as watchlist_router
from app.routers.preferences import router as preferences_router


app = FastAPI(
    title="Movie App API",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json"
)


# -------------------------
# CORS
# -------------------------

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


# -------------------------
# DATABASE CREATE + MIGRATION
# -------------------------

@app.on_event("startup")
def startup():

    Base.metadata.create_all(bind=engine)

   migrations = [
    "ALTER TABLE watched ADD COLUMN watched_at DATETIME",
    "ALTER TABLE favorites ADD COLUMN created_at DATETIME",
    "ALTER TABLE reviews ADD COLUMN created_at DATETIME",
    "ALTER TABLE search_history ADD COLUMN query TEXT",
    "ALTER TABLE search_history ADD COLUMN created_at DATETIME",
]
    with engine.connect() as conn:

        for migration in migrations:
            try:
                conn.execute(text(migration))
                conn.commit()

                print(
                    "Migration applied:",
                    migration
                )

            except Exception as e:
                print(
                    "Migration skipped:",
                    e
                )


# -------------------------
# ROUTES
# -------------------------

app.include_router(auth.router)

app.include_router(profile.router)

app.include_router(movies.router)

app.include_router(favorites.router)

app.include_router(recommendations.router)

app.include_router(notifications.router)

app.include_router(watched_router)

app.include_router(watchlist_router)

app.include_router(preferences_router)

# Dashboard
app.include_router(dashboard.router)


# -------------------------
# HOME
# -------------------------

@app.get("/")
def home():
    return {
        "message": "Movie API is running"
    }