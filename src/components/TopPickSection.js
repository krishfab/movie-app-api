import React, { useEffect } from "react";
import MovieCard from "./MovieCard";

const TopPickSection = ({ movies, onSelect }) => {
  // Equalize card heights
  useEffect(() => {
    const updateHeights = () => {
      const cards = document.querySelectorAll(".top-pick-item");
      if (!cards.length) return;

      let maxHeight = 0;
      cards.forEach((card) => (card.style.height = "auto"));

      cards.forEach((card) => {
        if (card.offsetHeight > maxHeight) maxHeight = card.offsetHeight;
      });

      cards.forEach((card) => (card.style.height = `${maxHeight}px`));
    };

    updateHeights();
    window.addEventListener("resize", updateHeights);
    return () => window.removeEventListener("resize", updateHeights);
  }, [movies]);

  // If no movies, show nothing
  if (!movies || movies.length === 0) return null;

  return (
    <div className="top-pick-section" style={{ padding: "1rem 2rem" }}>
      <h2 style={{ color: "white", marginBottom: "1rem" }}>Top Pick for You</h2>
      <div
        className="top-pick-content"
        style={{ display: "flex", gap: "10px", overflowX: "auto" }}
      >
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onClick={onSelect}
            className="top-pick-item"
          />
        ))}
      </div>
    </div>
  );
};

export default TopPickSection;
