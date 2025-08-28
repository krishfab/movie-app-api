import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { UserContext } from "../context/UserContext"; // import context

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]); // always an array
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  const { user } = useContext(UserContext); // get user from context

  // Fetch movie details and existing comments
  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/movies/getMovie/${movieId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("GET MOVIE RESPONSE:", data);
        setMovie(data);

        // Ensure comments array
        if (Array.isArray(data.comments)) {
          setComments(data.comments);
        } else {
          setComments([]);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movie:", err);
        setLoading(false);
      });
  }, [movieId]);

  // Add a new comment
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    if (!user || !user.token) {
      alert("You must be logged in to add a comment.");
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/movies/addComment/${movieId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`, // use token from context
      },
      body: JSON.stringify({ comment: newComment }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("ADD COMMENT RESPONSE:", data);
        if (Array.isArray(data.comments)) {
          setComments(data.comments);
        }
        setNewComment("");
      })
      .catch((err) => console.error("Error adding comment:", err));
  };

  if (loading) return <p style={{ color: "#fff" }}>Loading...</p>;
  if (!movie) return <p style={{ color: "#fff" }}>Movie not found</p>;

  return (
    <div style={{ minHeight: "100vh", background: "#141414", color: "#fff", padding: "2rem" }}>
      <h1>{movie.title}</h1>
      <img
        src={movie.background}
        alt={movie.title}
        style={{
          width: "100%",
          maxHeight: "600px",
          objectFit: "cover",
          borderRadius: "10px",
          marginBottom: "1rem",
        }}
      />
      <p>{movie.description}</p>

      <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
        <button
          style={{ padding: "0.5rem 1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <FaPlay /> Play
        </button>
      </div>

      {/* Comments Section */}
      <div style={{ marginTop: "2rem" }}>
        <h3>Comments</h3>
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            style={{ flex: 1, padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <button onClick={handleAddComment} style={{ padding: "0.5rem 1rem" }}>
            Add
          </button>
        </div>

        <ul>
          {Array.isArray(comments) && comments.length > 0 ? (
            comments.map((c, idx) => (
              <li key={idx}>
                <strong>{c.user?.email || "Anonymous"}:</strong> {c.text}
              </li>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default MovieDetails;
