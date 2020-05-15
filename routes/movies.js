const express = require("express");
const router = express.Router();

//localhost:3000/movies
router.get("/", (req, res) => {
  let movies = [
    { name: "spidermane", genre: "action" },
    { name: "mickey mouse", genre: "kids" },
  ];
  res.render("movies", { movies: movies });
});
