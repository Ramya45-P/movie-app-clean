import api from "./api";

// Get all user collections
export const getCollections = async () => {
  const response = await api.get("/collections/");
  return response.data;
};


// Create new collection
export const createCollection = async (collectionData) => {
  const response = await api.post(
    "/collections/",
    collectionData
  );

  return response.data;
};


// Update collection
export const updateCollection = async (id, collectionData) => {
  const response = await api.put(
    `/collections/${id}`,
    collectionData
  );

  return response.data;
};


// Delete collection
export const deleteCollection = async (id) => {
  const response = await api.delete(
    `/collections/${id}`
  );

  return response.data;
};


// Get collection details with movies
export const getCollectionDetails = async (id) => {
  const response = await api.get(
    `/collections/${id}`
  );

  return response.data;
};


// Add movie to collection
export const addMovieToCollection = async (
  collectionId,
  movieId
) => {
  const response = await api.post(
    `/collections/${collectionId}/movies`,
    {
      movie_id: movieId,
    }
  );

  return response.data;
};


// Remove movie from collection
export const removeMovieFromCollection = async (
  collectionId,
  movieId
) => {
  const response = await api.delete(
    `/collections/${collectionId}/movies/${movieId}`
  );

  return response.data;
};


// Get public collections
export const getPublicCollections = async () => {
  const response = await api.get(
    "/collections/public"
  );

  return response.data;
};


// Search collections
export const searchCollections = async (query) => {
  const response = await api.get(
    `/collections/search?query=${query}`
  );

  return response.data;
};