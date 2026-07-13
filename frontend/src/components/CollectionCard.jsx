import React from "react";
import { useNavigate } from "react-router-dom";

const CollectionCard = ({ collection, onDelete, onEdit }) => {

  const navigate = useNavigate();

  return (
    <div className="card shadow-sm h-100 border-0">

      <div className="card-body">

        <div className="d-flex justify-content-between">

          <h5 className="fw-bold">
            {collection.name}
          </h5>

          <span
            className={
              collection.is_public
                ? "badge bg-success"
                : "badge bg-secondary"
            }
          >
            {collection.is_public
              ? "Public"
              : "Private"}
          </span>

        </div>


        <p className="text-muted mt-2">
          {collection.description ||
            "No description available"}
        </p>


        <div className="small">

          <p>
            🎬 Movies:
            {" "}
            {collection.movie_count ||
             collection.movies?.length ||
             0}
          </p>


          <p>
            📅 Created:
            {" "}
            {
              collection.created_at
              ?
              new Date(
                collection.created_at
              ).toLocaleDateString()
              :
              "N/A"
            }
          </p>


        </div>



        <div className="mt-3">

          <button
            className="btn btn-primary btn-sm me-2"
            onClick={() =>
              navigate(
                `/collections/${collection.id}`
              )
            }
          >
            View
          </button>


          <button
            className="btn btn-outline-warning btn-sm me-2"
            onClick={() =>
              onEdit(collection)
            }
          >
            Edit
          </button>


          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() =>
              onDelete(collection.id)
            }
          >
            Delete
          </button>


        </div>


      </div>

    </div>
  );
};


export default CollectionCard;