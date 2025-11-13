const express = require("express");
const axios = require("axios");
const router = express.Router();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

router.get("/nearby", async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: "Missing latitude or longitude" });
  }

  const radius = 2000;

  try {
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=restaurant&key=${GOOGLE_API_KEY}`;
    const response = await axios.get(url);

    // Filtramos solo los que tienen el tipo 'restaurant'
    const onlyRestaurants = response.data.results.filter((place) =>
      place.types.includes("restaurant")
    );

    // Mapeamos al formato que espera tu frontend
    const mapped = onlyRestaurants.map((place) => ({
      _id: place.place_id,
      brandName: place.name || "Sin nombre",
      address: place.vicinity || "Sin dirección",
      votos: place.user_ratings_total || 0,
      puntuacion: place.rating || 0,
      transporte: "Google API",
      oferta: false,
      categoria: "google",
      img: place.photos
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${place.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`
        : null,
    }));

    return res.json(mapped);
  } catch (error) {
    console.error(
      "Google Places API Error:",
      error.response?.data || error.message
    );
    return res
      .status(500)
      .json({ error: "Failed to fetch nearby restaurants" });
  }
});

module.exports = router;
