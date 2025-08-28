import React, { useState, useEffect } from "react";
import { FaPlay, FaInfoCircle } from "react-icons/fa";


const MovieGallery = ({ movies }) => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Set the first movie as featured once movies are loaded
  useEffect(() => {
    if (movies && movies.length > 0) {
      setFeaturedMovie(movies[0]);
      setCurrentIndex(0);
    }
  }, [movies]);

  // Auto-play featured background
  useEffect(() => {
    if (!movies || movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
      setFeaturedMovie(movies[(currentIndex + 1) % movies.length]);
    }, 2000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [movies, currentIndex]);

  // Helper to handle both absolute and relative URLs
const getFullUrl = (url) => {
  if (!url) return "";
  return url.startsWith("http") ? url : `${process.env.REACT_APP_API_URL}/images/${url}`;
};


  return (
    <div className="movie-gallery" style={{ backgroundColor: "#141414" }}>
      {featuredMovie ? (
        <>
          {/* Featured Background */}
          <div
            className="featured-background"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(20,20,20,1), rgba(20,20,20,0.5)), url(${getFullUrl(featuredMovie.background)})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "80vh",
              position: "relative",
              color: "white",
              padding: "4rem 2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              transition: "background 1s ease-in-out",
            }}
          >
            <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
              {featuredMovie.title}
            </h1>
            <p style={{ maxWidth: "500px", fontSize: "1.2rem" }}>
              {featuredMovie.description}
            </p>

            <div style={{ marginTop: "1rem" }}>
              <button
                style={{
                  padding: "0.6rem 1.5rem",
                  marginRight: "1rem",
                  backgroundColor: "white",
                  color: "black",
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                <FaPlay /> Play
              </button>
              <button
                style={{
                  padding: "0.6rem 1.5rem",
                  backgroundColor: "rgba(109,109,110,0.7)",
                  color: "white",
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                <FaInfoCircle /> More Info
              </button>
            </div>
          </div>

          {/* Thumbnails Row */}
          <div style={{ padding: "1rem 2rem" }}>
            <h2 style={{ color: "white", marginBottom: "1rem" }}>
              Popular on Netflix
            </h2>
            <div
              className="thumbnails-row"
              style={{
                display: "flex",
                gap: "10px",
                overflowX: "auto",
                paddingBottom: "1rem",
              }}
            >
              {movies.map((movie, idx) => (
                <img
                  key={movie._id}
                  src={getFullUrl(movie.thumbnail)}
                  alt={movie.title}
                  onClick={() => {
                    setFeaturedMovie(movie);
                    setCurrentIndex(idx);
                  }}
                  style={{
                    width: "180px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "transform 0.3s",
                    border: idx === currentIndex ? "2px solid white" : "none",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <p style={{ color: "white", padding: "2rem" }}>Loading movies...</p>
      )}
    </div>
  );
};

export default MovieGallery;
