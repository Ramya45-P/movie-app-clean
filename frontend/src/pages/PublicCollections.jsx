import React, { useEffect, useState } from "react";
import { getPublicCollections } from "../services/collections";


function PublicCollections() {

  const [collections, setCollections] = useState([]);


  useEffect(() => {
    loadPublicCollections();
  }, []);



  const loadPublicCollections = async () => {

    try {

      const data = await getPublicCollections();

      setCollections(data);

    } catch(err) {

      console.error(err);

    }

  };



  return (

    <div className="container mt-4">

      <h2>🌍 Public Collections</h2>


      {collections.length === 0 ? (

        <p>No public collections available.</p>

      ) : (

        collections.map((collection)=>(

          <div
            key={collection.id}
            className="card p-3 mb-3"
          >

            <h4>
              {collection.name}
            </h4>


            <p>
              👤 Owner: {collection.owner}
            </p>


            <p>
              🎬 Movies: {collection.movie_count}
            </p>


            <p>
              📅 Created:
              {" "}
              {new Date(
                collection.created_at
              ).toLocaleDateString()}
            </p>


          </div>

        ))

      )}


    </div>

  );

}


export default PublicCollections;