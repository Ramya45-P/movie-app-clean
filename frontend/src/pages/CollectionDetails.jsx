import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  getCollectionDetails,
  removeMovieFromCollection
} from "../services/collections";


const CollectionDetails = () => {


  const { id } = useParams();

  const navigate = useNavigate();


  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadCollection = useCallback(async () => {

  try {

    const data =
      await getCollectionDetails(id);

    setCollection(data);


  } catch (error) {

    console.error(
      "Failed loading collection",
      error
    );

  } finally {

    setLoading(false);

  }

}, [id]);

  useEffect(() => {

  loadCollection();

}, [loadCollection]);




  const handleRemove = async (movieId) => {


    try {


      await removeMovieFromCollection(
        id,
        movieId
      );


      loadCollection();



    } catch(error){

      console.error(
        "Remove movie failed",
        error
      );

    }

  };





  if (loading) {

    return (
      <div className="container mt-5">
        Loading collection...
      </div>
    );

  }




  if (!collection) {

    return (
      <div className="container mt-5">
        Collection not found
      </div>
    );

  }





  return (

    <div className="container mt-4">



      <button
        className="btn btn-outline-secondary mb-3"
        onClick={() =>
          navigate("/collections")
        }
      >
        ← Back
      </button>




      <div className="card shadow-sm mb-4">

        <div className="card-body">


          <div className="d-flex justify-content-between">


            <h2 className="fw-bold">
              {collection.name}
            </h2>



            <span
              className={
                collection.is_public
                ?
                "badge bg-success"
                :
                "badge bg-secondary"
              }
            >

              {
                collection.is_public
                ?
                "Public"
                :
                "Private"
              }

            </span>



          </div>



          <p className="text-muted">

            {
              collection.description ||
              "No description"
            }

          </p>



        </div>

      </div>





      <h4 className="mb-3">
        Movies
      </h4>





      {
        !collection.movies ||
        collection.movies.length === 0
        ?

        <p>
          No movies added yet.
        </p>


        :



        <div className="row">


          {
            collection.movies.map(
              (movie)=>(


                <div
                  className="col-md-3 mb-4"
                  key={movie.id}
                >


                  <div className="card h-100 shadow-sm">


                    {
                      movie.poster &&
                      <img
                        src={movie.poster}
                        className="card-img-top"
                        alt={movie.title}
                      />
                    }



                    <div className="card-body">


                      <h6>
                        {movie.title}
                      </h6>



                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          handleRemove(
                            movie.id
                          )
                        }
                      >

                        Remove

                      </button>


                    </div>


                  </div>


                </div>


              )
            )
          }


        </div>


      }




    </div>

  );

};


export default CollectionDetails;