from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Database
from app.database.db import Base, engine

# Models
from app.models.user import User
from app.models.movie import Movie
from app.models.review import Review
from app.models.favorite import Favorite

# Routers
from app.routers.auth import router as auth_router
from app.routers.movies import router as movie_router
from app.routers.favorites import router as favorite_router
from app.routers.recommendations import router as recommendation_router
from app.routers.notifications import router as notification_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Movie App API",
    version="1.0.0"
)

# ----------------------------
# CORS Configuration
# ----------------------------
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://movie-app-clean-git-master-ramya8.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# Routers
# ----------------------------
app.include_router(auth_router)
app.include_router(movie_router)
app.include_router(favorite_router)
app.include_router(recommendation_router)
app.include_router(notification_router)

# ----------------------------
# Home
# ----------------------------
@app.get("/")
def home():
    return {"message": "Movie API is running successfully"}