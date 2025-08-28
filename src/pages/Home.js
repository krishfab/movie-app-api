import React, { useEffect, useState } from "react";
import MovieGallery from "../components/MovieGallery"; 
import TrendingSection from "../components/TrendingSection"; // ✅ import TrendingSection

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/movies/getMovie`) 
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched movies:", data);
        setMovies(data);
      })
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  return (
    <div>
      {/* Featured Movies */}
      <MovieGallery movies={movies} style={{ paddingTop: "70px" }} />

      {/* Trending Section */}
      {movies.length > 1 && (
        <TrendingSection 
          movies={movies.slice(1)}  // exclude featured movie
          onSelect={setSelectedMovie} 
        />
      )}

      {/* Optional Movie Details Modal */}
      {selectedMovie && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, width: "100%", height: "100%",
          background: "rgba(0,0,0,0.8)",
          display: "flex", justifyContent: "center", alignItems: "center",
          zIndex: 10000
        }}>
          <div style={{
            background: "#141414", color: "#fff",
            padding: "2rem", borderRadius: "8px", maxWidth: "600px", width: "90%"
          }}>
            <button onClick={() => setSelectedMovie(null)} style={{ float: "right", fontSize: "1.2rem" }}>X</button>
            <h2>{selectedMovie.title}</h2>
            <p>{selectedMovie.description}</p>
            <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
              <button style={{ padding: "0.5rem 1rem", display: "flex", alignItems: "center" }}>
                Play
              </button>
              <button style={{ padding: "0.5rem 1rem", display: "flex", alignItems: "center" }}>
                Comments
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;






