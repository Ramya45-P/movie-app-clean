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
]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# CREATE TABLES ON STARTUP
@app.on_event("startup")
def startup():
    print("========== CREATING TABLES ==========")
    Base.metadata.create_all(bind=engine)
    print("========== TABLES CREATED ==========")

# Routers
app.include_router(movies.router)
app.include_router(favorites.router)
app.include_router(recommendations.router)
app.include_router(auth.router)
app.include_router(notifications.router)

@app.get("/")
def home():
    return {"message": "Movie API is running successfully"}
