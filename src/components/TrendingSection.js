// import React, { useEffect } from "react";
// import MovieCard from "./MovieCard";

// const TrendingSection = ({ movies, onSelect }) => {
//   // Early return if no movies
//   if (!movies || movies.length === 0) return null;

//   // UseEffect must be at the top level
//   useEffect(() => {
//     const updateHeights = () => {
//       const cards = document.querySelectorAll(".trending-item");
//       let maxHeight = 0;

//       // Reset heights
//       cards.forEach(card => (card.style.height = "auto"));

//       // Find tallest card
//       cards.forEach(card => {
//         if (card.offsetHeight > maxHeight) maxHeight = card.offsetHeight;
//       });

//       // Set all cards to tallest height
//       cards.forEach(card => (card.style.height = `${maxHeight}px`));
//     };

//     updateHeights();
//     window.addEventListener("resize", updateHeights);
//     return () => window.removeEventListener("resize", updateHeights);
//   }, [movies]);

//   return (
//     <div className="trending-section" style={{ padding: "1rem 2rem" }}>
//       <h2 style={{ color: "white", marginBottom: "1rem" }}>Trending</h2>
//       <div
//         className="trending-content"
//         style={{ display: "flex", gap: "10px", overflowX: "auto" }}
//       >
//         {movies.map((movie) => (
//           <MovieCard key={movie._id} movie={movie} onClick={onSelect} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TrendingSection;

import React, { useEffect } from "react";
import MovieCard from "./MovieCard";

const TrendingSection = ({ movies, onSelect }) => {
  // UseEffect at the top level
  useEffect(() => {
    const updateHeights = () => {
      const cards = document.querySelectorAll(".trending-item");
      if (!cards.length) return; // do nothing if no cards

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

  // Early return for empty movies
  if (!movies || movies.length === 0) return null;

  return (
    <div className="trending-section" style={{ padding: "1rem 2rem" }}>
      <h2 style={{ color: "white", marginBottom: "1rem" }}>Trending</h2>
      <div
        className="trending-content"
        style={{ display: "flex", gap: "10px", overflowX: "auto" }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} onClick={onSelect} />
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;


