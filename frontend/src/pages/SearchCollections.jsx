import React, { useState } from "react";
import { searchCollections } from "../services/collections";


function SearchCollections() {


  const [query,setQuery] = useState("");

  const [results,setResults] = useState([]);



  const handleSearch = async()=>{

    if(!query.trim())
      return;


    try{

      const data = await searchCollections(query);

      setResults(data);


    }catch(err){

      console.error(err);

    }

  };



  return (

    <div className="container mt-4">


      <h2>🔍 Search Collections</h2>



      <div className="input-group mb-3">


        <input

          className="form-control"

          placeholder="Search collections..."

          value={query}

          onChange={(e)=>
            setQuery(e.target.value)
          }

        />


        <button

          className="btn btn-primary"

          onClick={handleSearch}

        >
          Search

        </button>


      </div>





      {results.map((collection)=>(

        <div

          key={collection.id}

          className="card p-3 mb-3"

        >

          <h4>
            {collection.name}
          </h4>


          <p>
            👤 Owner:
            {" "}
            {collection.owner}
          </p>


          <p>
            🎬 Movies:
            {" "}
            {collection.movie_count}
          </p>


          <p>
            {collection.is_public
              ? "🌍 Public"
              : "🔒 Private"}
          </p>


        </div>

      ))}



    </div>

  );

}


export default SearchCollections;