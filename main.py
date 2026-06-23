from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.db import Base, engine

# Models
from app.models.user import User
from app.models.movie import Movie
from app.models.review import Review
from app.models.favorite import Favorite

# Routers
from app.routers import movies, auth, favorites, recommendations

app = FastAPI(
    title="Movie App API",
    version="1.0.0",
    swagger_ui_parameters={
        "persistAuthorization": True
    }
)

# Create database tables
Base.metadata.create_all(bind=engine)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "https://movie-app-clean-ten.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(movies.router)
app.include_router(auth.router)
app.include_router(favorites.router)
app.include_router(recommendations.router)

@app.get("/")
def home():
    return {"message": "API running"}