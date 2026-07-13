import React, { useEffect, useState } from "react";
import {
  getCollections,
  deleteCollection,
} from "../services/collections";
import CreateCollectionModal from "../components/CreateCollectionModal";
import CollectionCard from "../components/CollectionCard";

const Collections = () => {

  const [collections, setCollections] = useState([]);
  const [showModal, setShowModal] = useState(false);


  const loadCollections = async () => {
    try {
      const data = await getCollections();
      setCollections(data);
    } catch (error) {
      console.error(
        "Failed to load collections:",
        error
      );
    }
  };


  useEffect(() => {
    loadCollections();
  }, []);



  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this collection?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCollection(id);

      setCollections(
        collections.filter(
          (item) => item.id !== id
        )
      );

    } catch (error) {
      console.error(
        "Delete failed:",
        error
      );
    }
  };



  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>
          My Collections
        </h2>


        <button
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          + Create Collection
        </button>

      </div>



      {
        collections.length === 0 ? (

          <p>
            No collections found.
          </p>

        ) : (

          <div className="row">

            {
              collections.map((collection) => (

                <div
                  className="col-md-4 mb-4"
                  key={collection.id}
                >

                  <CollectionCard
                    collection={collection}
                    onDelete={handleDelete}
                  />

                </div>

              ))
            }

          </div>

        )
      }



      {
        showModal && (

          <CreateCollectionModal
            closeModal={() =>
              setShowModal(false)
            }
            refreshCollections={
              loadCollections
            }
          />

        )
      }


    </div>
  );
};


export default Collections;