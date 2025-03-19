require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");

const router = express.Router();

const tmdbApiKey = process.env.TMDB_API_KEY;

router.get("/movies", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}`
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch data" });
    }

    const data = await response.json();
    return res.json({ movies: data.results });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
