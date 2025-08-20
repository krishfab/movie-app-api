const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/user");
const movieRoutes = require("./routes/movie");


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); 
  });

const port = process.env.PORT || 4000;

app.use("/users", userRoutes);
app.use("/movies", movieRoutes);


app.listen(port, () => console.log(`Server running on port ${port}`));