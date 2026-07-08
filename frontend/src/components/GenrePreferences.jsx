import React, { useEffect, useState } from "react";
import {
  getPreferences,
  addPreference,
  deletePreference,
} from "../services/preferences";

function GenrePreferences() {
  const [preferences, setPreferences] = useState([]);
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(true);

  const loadPreferences = async () => {
    try {
      const data = await getPreferences();
      setPreferences(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPreferences();
  }, []);

  const handleAdd = async () => {
    if (!genre.trim()) return;

    try {
      await addPreference(genre);

      setGenre("");

      loadPreferences();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePreference(id);

      loadPreferences();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <h3>Loading Preferences...</h3>;
  }

  return (
    <div
      style={{
        marginTop: "30px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h2>🎭 Genre Preferences</h2>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Enter Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          style={{
            padding: "10px",
            flex: 1,
          }}
        />

        <button
          onClick={handleAdd}
          style={{
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </div>

      {preferences.length === 0 ? (
        <p>No genre preferences added.</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          {preferences.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#1976d2",
                color: "#fff",
                padding: "10px 15px",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <span>{item.genre}</span>

              <button
                onClick={() => handleDelete(item.id)}
                style={{
                  border: "none",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  width: "22px",
                  height: "22px",
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default GenrePreferences;