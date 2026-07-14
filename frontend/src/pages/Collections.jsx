import React, { useEffect, useState } from "react";

import {
  getCollections,
  getCollectionDetails,
  deleteCollection,
  createCollection,
  updateCollection,
  removeMovieFromCollection,
} from "../services/collections";


function Collections() {

  const [collections, setCollections] = useState([]);

  const [selectedCollection, setSelectedCollection] = useState(null);

  const [showForm, setShowForm] = useState(false);


  const [formData, setFormData] = useState({
    name: "",
    description: "",
    is_public: false,
  });


  const [editingCollection, setEditingCollection] = useState(null);


  const [editData, setEditData] = useState({
    name: "",
    description: "",
    is_public: false,
  });



  useEffect(() => {
    loadCollections();
  }, []);



  const loadCollections = async () => {

    try {

      const data = await getCollections();

      setCollections(data);

    } catch (err) {

      console.error(err);

    }

  };



  const handleView = async (id) => {

    try {

      const data = await getCollectionDetails(id);

      setSelectedCollection(data);

    } catch (err) {

      console.error(err);

    }

  };



  const handleDelete = async (id) => {

    if (!window.confirm("Delete this collection?"))
      return;


    try {

      await deleteCollection(id);


      if (selectedCollection?.id === id) {
        setSelectedCollection(null);
      }


      loadCollections();


    } catch (err) {

      console.error(err);

    }

  };



  const handleCreate = async (e) => {

    e.preventDefault();


    try {

      await createCollection(formData);


      setFormData({
        name: "",
        description: "",
        is_public: false,
      });


      setShowForm(false);


      loadCollections();


    } catch (err) {

      alert(
        err.response?.data?.detail ||
        "Failed to create collection"
      );

    }

  };



  const handleEdit = async (e) => {

    e.preventDefault();


    try {

      await updateCollection(
        editingCollection.id,
        editData
      );


      setEditingCollection(null);

      loadCollections();


    } catch (err) {

      alert(
        err.response?.data?.detail ||
        "Failed to update collection"
      );

    }

  };



  const handleRemoveMovie = async (
    collectionId,
    movieId
  ) => {


    if (!window.confirm("Remove this movie from collection?"))
      return;


    try {

      await removeMovieFromCollection(
        collectionId,
        movieId
      );


      handleView(collectionId);


    } catch (err) {

      alert(
        err.response?.data?.detail ||
        "Failed to remove movie"
      );

    }

  };



  return (

    <div className="container mt-4">


      <h2>My Collections</h2>



      <button
        className="btn btn-success mb-3"
        onClick={() => setShowForm(!showForm)}
      >

        {showForm ? "Cancel" : "+ Create Collection"}

      </button>



      {showForm && (

        <form
          onSubmit={handleCreate}
          className="card p-3 mb-4"
        >

          <input
            className="form-control mb-2"
            placeholder="Collection Name"
            value={formData.name}
            onChange={(e)=>
              setFormData({
                ...formData,
                name:e.target.value
              })
            }
            required
          />


          <textarea
            className="form-control mb-2"
            placeholder="Description"
            value={formData.description}
            onChange={(e)=>
              setFormData({
                ...formData,
                description:e.target.value
              })
            }
          />


          <div className="form-check mb-3">

            <input
              type="checkbox"
              className="form-check-input"
              checked={formData.is_public}
              onChange={(e)=>
                setFormData({
                  ...formData,
                  is_public:e.target.checked
                })
              }
            />

            <label className="form-check-label">
              Public Collection
            </label>

          </div>


          <button className="btn btn-primary">
            Create Collection
          </button>


        </form>

      )}






      {editingCollection && (

        <form
          onSubmit={handleEdit}
          className="card p-3 mb-4"
        >

          <h4>Edit Collection</h4>


          <input
            className="form-control mb-2"
            value={editData.name}
            onChange={(e)=>
              setEditData({
                ...editData,
                name:e.target.value
              })
            }
          />


          <textarea
            className="form-control mb-2"
            value={editData.description}
            onChange={(e)=>
              setEditData({
                ...editData,
                description:e.target.value
              })
            }
          />


          <button className="btn btn-success me-2">
            Save Changes
          </button>


          <button
            type="button"
            className="btn btn-secondary"
            onClick={() =>
              setEditingCollection(null)
            }
          >
            Cancel
          </button>


        </form>

      )}






      {collections.map((collection)=>(

        <div
          key={collection.id}
          className="card p-3 mb-3"
        >

          <h4>{collection.name}</h4>

          <p>{collection.description}</p>


          <p>
            {collection.is_public
              ? "🌍 Public"
              : "🔒 Private"}
          </p>



          <button
            className="btn btn-primary me-2"
            onClick={() =>
              handleView(collection.id)
            }
          >
            View
          </button>



          <button
            className="btn btn-warning me-2"
            onClick={() => {

              setEditingCollection(collection);

              setEditData({
                name:collection.name,
                description:collection.description,
                is_public:collection.is_public
              });

            }}
          >
            Edit
          </button>



          <button
            className="btn btn-danger"
            onClick={() =>
              handleDelete(collection.id)
            }
          >
            Delete
          </button>


        </div>

      ))}






      {selectedCollection && (

        <div className="card mt-4 p-3">

          <h3>
            {selectedCollection.name}
          </h3>


          <p>
            {selectedCollection.description}
          </p>



          <h5>Movies</h5>



          {selectedCollection.movies.length === 0 ? (

            <p>No movies in this collection.</p>

          ) : (

            <ul className="list-group">


              {selectedCollection.movies.map((movie)=>(

                <li
                  key={movie.id}
                  className="list-group-item"
                >

                  <div className="d-flex justify-content-between">

                    <strong>
                      {movie.title}
                    </strong>


                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        handleRemoveMovie(
                          selectedCollection.id,
                          movie.id
                        )
                      }
                    >
                      Remove
                    </button>


                  </div>


                  <br/>

                  {movie.genre}

                  <br/>

                  ⭐ {movie.rating}


                </li>

              ))}


            </ul>

          )}


        </div>

      )}



    </div>

  );

}


export default Collections;