const Movie = require("../models/Movie");

// Create
module.exports.addMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).send(movie);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Update
module.exports.updateMovie = async (req, res) => {
  try {
    const updated = await Movie.findByIdAndUpdate(req.params.movieId, req.body, { new: true });
    if (!updated) return res.status(404).send({ message: "Movie not found" });
    res.status(200).send(updated);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

//Delete
module.exports.deleteMovie = async (req, res) => {
  try {
    const deleted = await Movie.findByIdAndDelete(req.params.movieId);
    if (!deleted) return res.status(404).send({ message: "Movie not found" });
    res.status(200).send({ message: "Movie deleted" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Get all
module.exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).send(movies);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Get by id
module.exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.movieId).populate("comments.user", "email");
    if (!movie) return res.status(404).send({ message: "Movie not found" });
    res.status(200).send(movie);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// === COMMENTS ===

module.exports.addComment = async (req, res) => {
  const movieId = req.params.movieId;
  const { comment } = req.body;

  if (!comment) return res.status(400).send({ message: "Comment text is required" });

  try {
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).send({ message: "Movie not found" });
    
    movie.comments.push({
      user: req.user.id, 
      text: comment
    });

    await movie.save();
    res.status(201).send({ message: "Comment added successfully", comments: movie.comments });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports.getComments = async (req, res) => {
  const movieId = req.params.movieId;

  try {
    const movie = await Movie.findById(movieId).populate("comments.user", "email");
    if (!movie) return res.status(404).send({ message: "Movie not found" });

    res.status(200).send({ comments: movie.comments });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};