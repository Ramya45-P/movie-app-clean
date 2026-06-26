from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.db import Base, engine

# Import models so SQLAlchemy creates all tables
from app.models.user import User
from app.models.movie import Movie
from app.models.review import Review
from app.models.favorite import Favorite
from app.models.search_history import SearchHistory
from app.models.notification import Notification

# Import routers
from app.routers import auth
from app.routers import movies
from app.routers import favorites
from app.routers import recommendations
from app.routers import notifications

app = FastAPI(
    title="Movie App API",
    version="1.0.0",
    swagger_ui_parameters={
        "persistAuthorization": True
    }
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

# Create database tables
@app.on_event("startup")
def startup():
    print("========== CREATING TABLES ==========")
    Base.metadata.create_all(bind=engine)
    print("========== TABLES CREATED ==========")

# Include routers
app.include_router(auth.router)
app.include_router(movies.router)
app.include_router(favorites.router)
app.include_router(recommendations.router)
app.include_router(notifications.router)

@app.get("/")
def home():
    return {
        "message": "Movie API is running successfully"
    }