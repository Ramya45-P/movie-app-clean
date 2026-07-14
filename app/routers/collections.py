from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.database.db import get_db
from app.models.collection import Collection
from app.models.user import User

from app.models.collection_movie import CollectionMovie
from app.models.movie import Movie
from app.schemas.collection_schema import AddMovieRequest
from app.schemas.collection_schema import CollectionDetailsResponse, CollectionMovieResponse 

from app.schemas.collection_schema import (
    CollectionCreate,
    CollectionResponse,
    CollectionUpdate,
    AddMovieRequest,
    CollectionDetailsResponse,
    CollectionMovieResponse,
)
from app.security import get_current_user

router = APIRouter(
    prefix="/collections",
    tags=["Collections"]
)


# CREATE COLLECTION
@router.post("/", response_model=CollectionResponse)
def create_collection(
    data: CollectionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    existing = db.query(Collection).filter(
        Collection.user_id == current_user.id,
        Collection.name == data.name
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Collection name already exists"
        )

    collection = Collection(
        name=data.name,
        description=data.description,
        is_public=data.is_public,
        user_id=current_user.id
    )

    db.add(collection)
    db.commit()
    db.refresh(collection)

    return collection


# GET MY COLLECTIONS
@router.get("/", response_model=list[CollectionResponse])
def get_collections(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return db.query(Collection).filter(
        Collection.user_id == current_user.id
    ).all()

# UPDATE COLLECTION
@router.put("/{collection_id}", response_model=CollectionResponse)
def update_collection(
    collection_id: int,
    data: CollectionUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    collection = db.query(Collection).filter(
        Collection.id == collection_id,
        Collection.user_id == current_user.id
    ).first()

    if not collection:
        raise HTTPException(
            status_code=404,
            detail="Collection not found"
        )

    # Prevent duplicate collection names
    if data.name:
        existing = db.query(Collection).filter(
            Collection.user_id == current_user.id,
            Collection.name == data.name,
            Collection.id != collection_id
        ).first()

        if existing:
            raise HTTPException(
                status_code=400,
                detail="Collection name already exists"
            )

        collection.name = data.name

    if data.description is not None:
        collection.description = data.description

    if data.is_public is not None:
        collection.is_public = data.is_public

    db.commit()
    db.refresh(collection)

    return collection

# DELETE COLLECTION
@router.delete("/{collection_id}")
def delete_collection(
    collection_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    collection = db.query(Collection).filter(
        Collection.id == collection_id,
        Collection.user_id == current_user.id
    ).first()

    if not collection:
        raise HTTPException(
            status_code=404,
            detail="Collection not found"
        )

    db.delete(collection)
    db.commit()

    return {
        "message": "Collection deleted successfully"
    }

@router.post("/{collection_id}/movies")
def add_movie_to_collection(
    collection_id: int,
    data: AddMovieRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    collection = db.query(Collection).filter(
        Collection.id == collection_id,
        Collection.user_id == current_user.id
    ).first()

    if not collection:
        raise HTTPException(
            status_code=404,
            detail="Collection not found"
        )

    movie = db.query(Movie).filter(
        Movie.id == data.movie_id
    ).first()

    if not movie:
        raise HTTPException(
            status_code=404,
            detail="Movie not found"
        )

    existing = db.query(CollectionMovie).filter(
        CollectionMovie.collection_id == collection_id,
        CollectionMovie.movie_id == data.movie_id
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Movie already exists in collection"
        )

    collection_movie = CollectionMovie(
        collection_id=collection_id,
        movie_id=data.movie_id
    )

    db.add(collection_movie)
    db.commit()

    return {
        "message": "Movie added to collection successfully"
    }



# GET PUBLIC COLLECTIONS
@router.get("/public")
def get_public_collections(
    db: Session = Depends(get_db)
):
    collections = db.query(Collection).filter(
        Collection.is_public == True
    ).all()

    result = []

    for collection in collections:
        result.append({
    "id": collection.id,
    "name": collection.name,
    "owner": collection.owner.username,
    "movie_count": len(collection.collection_movies),
    "created_at": collection.created_at
})

    return result


# REMOVE MOVIE FROM COLLECTION
@router.delete("/{collection_id}/movies/{movie_id}")
def remove_movie_from_collection(
    collection_id: int,
    movie_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    collection = db.query(Collection).filter(
        Collection.id == collection_id,
        Collection.user_id == current_user.id
    ).first()

    if not collection:
        raise HTTPException(
            status_code=404,
            detail="Collection not found"
        )

    collection_movie = db.query(CollectionMovie).filter(
        CollectionMovie.collection_id == collection_id,
        CollectionMovie.movie_id == movie_id
    ).first()

    if not collection_movie:
        raise HTTPException(
            status_code=404,
            detail="Movie not found in collection"
        )

    db.delete(collection_movie)
    db.commit()

    return {
        "message": "Movie removed from collection successfully"
    }
@router.get("/search")
def search_collections(
    query: str,
    db: Session = Depends(get_db)
):
    collections = db.query(Collection).join(Collection.owner).filter(
        or_(
            Collection.name.ilike(f"%{query}%"),
            User.username.ilike(f"%{query}%")
        )
    ).all()

    result = []

    for collection in collections:
        result.append({
            "id": collection.id,
            "name": collection.name,
            "owner": collection.owner.username,
            "movie_count": len(collection.collection_movies),
            "created_at": collection.created_at,
            "is_public": collection.is_public
        })

    return result

@router.get("/{collection_id}", response_model=CollectionDetailsResponse)
def get_collection(
    collection_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    collection = db.query(Collection).filter(
        Collection.id == collection_id,
        Collection.user_id == current_user.id
    ).first()

    if not collection:
        raise HTTPException(
            status_code=404,
            detail="Collection not found"
        )

    movies = []

    for item in collection.collection_movies:
        movies.append(item.movie)

    return {
        "id": collection.id,
        "name": collection.name,
        "description": collection.description,
        "is_public": collection.is_public,
        "user_id": collection.user_id,
        "created_at": collection.created_at,
        "movies": movies,
    }