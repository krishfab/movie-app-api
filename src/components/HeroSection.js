// import React from "react";

// const HeroSection = ({ movie }) => {
//   return (
//     <div
//       className="hero-section"
//       style={{
//         width: "100%",
//         height: "400px",
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundImage: movie ? `url(${movie.background})` : "none",
//         display: "flex",
//         alignItems: "flex-end",
//         color: "#fff",
//         padding: "20px",
//         position: "relative",
//       }}
//     >
//       {movie ? (
//         <div>
//           <h1>{movie.title}</h1>
//           <p>{movie.description}</p>
//         </div>
//       ) : (
//         <h1>Select a Movie</h1>
//       )}
//     </div>
//   );
// };

// export default HeroSection;

import React from "react";
import NavBar from "../components/NavBar";

const HeroSection = ({ movie }) => {
  return (
    <div
      className="hero-section"
      style={{
        width: "100%",
        height: "400px",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: movie ? `url(${movie.background})` : "none",
        display: "flex",
        alignItems: "flex-end",
        color: "#fff",
        padding: "20px",
        position: "relative", // needed for absolute navbar
      }}
    >
      {/* Navbar overlay */}
      <NavBar
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 100,
          background: "rgba(0,0,0,0.3)", // semi-transparent black
        }}
      />

      {/* Movie info */}
      {movie ? (
        <div style={{ zIndex: 1 }}>
          <h1>{movie.title}</h1>
          <p>{movie.description}</p>
        </div>
      ) : (
        <h1 style={{ zIndex: 1 }}>Select a Movie</h1>
      )}
    </div>
  );
};

export default HeroSection;


