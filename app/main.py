from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.db import Base, engine

# Models
from app.models.user import User
from app.models.movie import Movie
from app.models.review import Review
from app.models.favorite import Favorite
from app.models.search_history import SearchHistory
from app.models.notification import Notification
from app.models.watched import Watched
from app.models.watchlist import Watchlist


# Routers
from app.routers import auth, movies, favorites, recommendations, notifications
from app.routers.watched import router as watched_router
from app.routers.watchlist import router as watchlist_router

app = FastAPI(
    title="Movie App API",
    version="1.0.0",
    swagger_ui_parameters={"persistAuthorization": True}
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://localhost:5173",

        # ✅ IMPORTANT: add your CURRENT frontend URL
        "https://movie-app-clean-0o52.vercel.app",
        "https://movie-app-clean-5zbe.vercel.app",
        "https://movie-app-clean.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.on_event("startup")
def startup():
    print("========== CREATING TABLES ==========")
    Base.metadata.create_all(bind=engine)
    print("========== TABLES CREATED ==========")

# Routers
app.include_router(auth.router)
app.include_router(movies.router)
app.include_router(favorites.router)
app.include_router(recommendations.router)
app.include_router(notifications.router)
app.include_router(watched_router)
app.include_router(watchlist_router)

@app.get("/")
def home():
    return {"message": "Movie API is running successfully"}