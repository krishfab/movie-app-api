import React from "react";
import MovieCard from "./MovieCard";

const MovieCarousel = ({ movies, onSelectMovie }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        overflowX: "auto",
        padding: "20px",
      }}
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onClick={onSelectMovie}
        />
      ))}
    </div>
  );
};

export default MovieCarousel;




