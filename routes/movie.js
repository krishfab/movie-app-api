const express = require("express");
const router = express.Router();
const movieController = require("../controller/movie");
const { verify, verifyAdmin } = require("../auth");

// Admin only
router.post("/addMovie", verify, verifyAdmin, movieController.addMovie);
router.put("/updateMovie/:movieId", verify, verifyAdmin, movieController.updateMovie);
router.delete("/deleteMovie/:movieId", verify, verifyAdmin, movieController.deleteMovie);

// authenticated user
router.get("/getMovie", verify, movieController.getMovies);
router.get("/getMovie/:movieId", verify, movieController.getMovie);

// === COMMENTS ===

// Add comment 
router.post("/addComment/:movieId", verify, movieController.addComment);

// Get comments
router.get("/getComments/:movieId", verify, movieController.getComments);

module.exports = router;