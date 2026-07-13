import React, { useState } from "react";
import { createCollection } from "../services/collections";


const CreateCollectionModal = ({
  closeModal,
  refreshCollections
}) => {


  const [formData, setFormData] = useState({
    name: "",
    description: "",
    is_public: false
  });


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");



  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;


    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value
    });

  };




  const handleSubmit = async (e) => {

    e.preventDefault();


    if (!formData.name.trim()) {

      setError(
        "Collection name is required"
      );

      return;
    }


    try {

      setLoading(true);
      setError("");


      await createCollection(formData);


      await refreshCollections();


      closeModal();


    } catch (error) {

      console.error(
        "Create collection failed:",
        error
      );


      setError(
        "Failed to create collection"
      );


    } finally {

      setLoading(false);

    }

  };



  return (

    <div
      className="modal d-block"
      tabIndex="-1"
      style={{
        backgroundColor:
          "rgba(0,0,0,0.5)"
      }}
    >

      <div className="modal-dialog modal-dialog-centered">


        <div className="modal-content">


          <div className="modal-header">

            <h5 className="modal-title">
              Create Collection
            </h5>


            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
            />

          </div>




          <form onSubmit={handleSubmit}>


            <div className="modal-body">


              {
                error &&
                <div className="alert alert-danger">
                  {error}
                </div>
              }



              <div className="mb-3">

                <label className="form-label">
                  Collection Name
                </label>


                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Example: My Favourite Movies"
                />

              </div>




              <div className="mb-3">

                <label className="form-label">
                  Description
                </label>


                <textarea
                  className="form-control"
                  rows="3"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Add description..."
                />

              </div>




              <div className="form-check">


                <input
                  className="form-check-input"
                  type="checkbox"
                  name="is_public"
                  checked={formData.is_public}
                  onChange={handleChange}
                  id="publicCheck"
                />


                <label
                  className="form-check-label"
                  htmlFor="publicCheck"
                >
                  Make this collection public
                </label>


              </div>



            </div>





            <div className="modal-footer">


              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
              >
                Cancel
              </button>



              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >

                {
                  loading
                  ?
                  "Creating..."
                  :
                  "Create Collection"
                }

              </button>


            </div>



          </form>


        </div>


      </div>


    </div>

  );

};


export default CreateCollectionModal;