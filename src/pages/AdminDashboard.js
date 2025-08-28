import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Button, Table, Modal, Form } from "react-bootstrap";

export default function AdminDashboard() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states for adding/updating
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [posterUrl, setPosterUrl] = useState("");

  // Update Modal
  const [showModal, setShowModal] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);

  // Wait until user is loaded
  useEffect(() => {
    if (user && !user.isAdmin) {
      alert("Access denied. Admins only.");
      navigate("/home");
    }
  }, [user, navigate]);

  // Function to fetch all movies
  const fetchAllMovies = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/movies/getMovie`);
      const data = await res.json();
      setMovies(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all movies on mount
  useEffect(() => {
    fetchAllMovies();
  }, []);

  // Add movie
  const handleAddMovie = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/movies/addMovie`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ title, director, year, genre, description, posterUrl }),
      });

      if (!res.ok) throw new Error("Failed to add movie");
      await res.json(); // no need to push manually

      alert("Movie added successfully!");
      fetchAllMovies(); // Refresh movies list

      // Reset form
      setTitle("");
      setDirector("");
      setYear("");
      setGenre("");
      setDescription("");
      setPosterUrl("");
    } catch (err) {
      alert(err.message);
    }
  };

  // Open modal for update
  const openUpdateModal = (movie) => {
    if (!movie) return;
    setCurrentMovie(movie);
    setTitle(movie.title || "");
    setDirector(movie.director || "");
    setYear(movie.year || "");
    setGenre(movie.genre || "");
    setDescription(movie.description || "");
    setPosterUrl(movie.posterUrl || "");
    setShowModal(true);
  };

  // Update movie
  const handleUpdateMovie = async () => {
    if (!currentMovie) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/movies/updateMovie/${currentMovie._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ title, director, year, genre, description, posterUrl }),
      });

      if (!res.ok) throw new Error("Failed to update movie");
      await res.json();

      alert("Movie updated!");
      setShowModal(false);
      fetchAllMovies(); // Refresh movies list
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete movie
  const handleDeleteMovie = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/movies/deleteMovie/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user.token}` },
      });
      if (!res.ok) throw new Error("Failed to delete movie");

      alert("Movie deleted!");
      fetchAllMovies(); // Refresh movies list
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      className="admin-dashboard"
      style={{ padding: "2rem", backgroundColor: "#0d1b2a", minHeight: "100vh", color: "#fff" }}
    >
      <h2 className="mb-4">Admin Dashboard</h2>

      {/* Add Movie Form */}
      <form onSubmit={handleAddMovie} className="mb-5 p-3" style={{ background: "#192a40", borderRadius: "10px" }}>
        <h4>Add New Movie</h4>
        <div className="mb-2">
          <input className="form-control" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-2">
          <input className="form-control" placeholder="Director" value={director} onChange={(e) => setDirector(e.target.value)} required />
        </div>
        <div className="mb-2">
          <input className="form-control" placeholder="Year" type="number" value={year} onChange={(e) => setYear(e.target.value)} required />
        </div>
        <div className="mb-2">
          <input className="form-control" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} required />
        </div>
        <div className="mb-2">
          <textarea className="form-control" placeholder="Description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="mb-2">
          <input className="form-control" placeholder="Poster URL (optional)" value={posterUrl} onChange={(e) => setPosterUrl(e.target.value)} />
        </div>
        <Button type="submit" variant="primary">Add Movie</Button>
      </form>

      {/* Movies Table */}
      <h4>Existing Movies</h4>
      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Title</th>
              <th>Director</th>
              <th>Year</th>
              <th>Genre</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.filter(Boolean).map((movie) => (
              <tr key={movie._id}>
                <td>{movie?.title || "N/A"}</td>
                <td>{movie?.director || "N/A"}</td>
                <td>{movie?.year || "N/A"}</td>
                <td>{movie?.genre || "N/A"}</td>
                <td>
                  <Button size="sm" variant="warning" className="me-2" onClick={() => openUpdateModal(movie)}>Update</Button>
                  <Button size="sm" variant="danger" onClick={() => handleDeleteMovie(movie._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Update Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Control placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control placeholder="Director" value={director} onChange={(e) => setDirector(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control placeholder="Year" type="number" value={year} onChange={(e) => setYear(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control placeholder="Description" as="textarea" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Control placeholder="Poster URL" value={posterUrl} onChange={(e) => setPosterUrl(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdateMovie}>Update</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

