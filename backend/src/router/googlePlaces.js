const express = require("express");
const axios = require("axios");
const router = express.Router();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// ======================================================
//   GET /api/google-places/nearby
//   Incluye restaurantes + cafeterías + etc
//   y añade types, price_level, location
// ======================================================
router.get("/nearby", async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: "Missing latitude or longitude" });
  }

  const radius = 2000; // 2 km alrededor

  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
      {
        params: {
          location: `${lat},${lng}`,
          radius,
          keyword: "restaurant,cafe,cafeteria,coffee,bar,bakery,food",
          key: GOOGLE_API_KEY,
        },
      }
    );

    const places = response.data.results || [];

    const mapped = places.map((place) => ({
      _id: place.place_id,
      brandName: place.name || "Sin nombre",
      address: place.vicinity || place.formatted_address || "Sin dirección",
      votos: place.user_ratings_total ?? 0,
      puntuacion: place.rating ?? 0,
      transporte: "Google API",
      oferta: false,
      categoria: "google",
      img: place.photos
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photo_reference=${place.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`
        : null,

      // 💡 estos 4 son CLAVE para que tus filtros funcionen
      types: place.types || [],
      price_level: place.price_level ?? null,
      location: place.geometry?.location || null, // { lat, lng }
      open_now: place.opening_hours?.open_now ?? null,
    }));

    return res.json(mapped);
  } catch (error) {
    console.error(
      "Google Places API Error:",
      error.response?.data || error.message
    );
    return res
      .status(500)
      .json({ error: "Failed to fetch nearby restaurants/cafeterias" });
  }
});

module.exports = router;
