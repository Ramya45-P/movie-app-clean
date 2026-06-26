from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.db import Base, engine

# Models (ensure they are imported)
from app.models.user import User
from app.models.movie import Movie
from app.models.review import Review
from app.models.favorite import Favorite
from app.models.search_history import SearchHistory
from app.models.notification import Notification  

# Routers
import app.routers.movies as movies
import app.routers.recommendations as recommendations
import app.routers.favorites as favorites
import app.routers.auth as auth
import app.routers.notifications as notifications

app = FastAPI(
    title="Movie App API",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "https://movie-app-clean-lkmwomqbq-ramya8.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)