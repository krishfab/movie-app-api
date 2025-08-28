import React from "react";
import { FaPlay, FaComment } from "react-icons/fa";

const MovieDetailsModal = ({ movie, onClose }) => {
  return (
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
        <button onClick={onClose} style={{ float: "right", fontSize: "1.2rem" }}>X</button>
        <h2>{movie.title}</h2>
        <p>{movie.description}</p>
        <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
          <button style={{ padding: "0.5rem 1rem", display: "flex", alignItems: "center" }}>
            <FaPlay /> Play
          </button>
          <button style={{ padding: "0.5rem 1rem", display: "flex", alignItems: "center" }}>
            <FaComment /> Comments
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;
