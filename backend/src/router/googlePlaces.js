const express = require("express");
const axios = require("axios");
const router = express.Router();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

// ======================================================
//   GET /api/google-places/nearby
//   Incluye restaurantes + cafeterías + bares, etc.
//   Y manda datos extra para poder filtrar en el FRONT
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
          // Capturamos varios tipos de negocio
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
      votos: place.user_ratings_total || 0,
      puntuacion: place.rating || 0,
      transporte: "Google API",
      oferta: false,
      categoria: "google",
      img: place.photos
        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photo_reference=${place.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`
        : null,
      // 💡 NUEVO: info extra para filtros en el frontend
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

// ======================================================
//   GET /api/google-places/place/:placeId
//   (deja esto tal cual si ya lo tenías actualizado)
// ======================================================
router.get("/place/:placeId", async (req, res) => {
  const { placeId } = req.params;

  if (!placeId) {
    return res.status(400).json({ error: "Missing placeId param" });
  }

  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/details/json",
      {
        params: {
          place_id: placeId,
          fields:
            "name,formatted_phone_number,international_phone_number,formatted_address,opening_hours,rating,user_ratings_total",
          key: GOOGLE_API_KEY,
        },
      }
    );

    const result = response.data.result;

    if (!result) {
      return res
        .status(404)
        .json({ error: "No details found for that placeId" });
    }

    const phone =
      result.international_phone_number ||
      result.formatted_phone_number ||
      null;

    res.json({
      name: result.name,
      address: result.formatted_address,
      phone,
      rating: result.rating ?? null,
      user_ratings_total: result.user_ratings_total ?? 0,
      open_now: result.opening_hours?.open_now ?? null,
      schedule: result.opening_hours?.weekday_text || [],
    });
  } catch (err) {
    console.error("Google Place Details Error:", err.message);
    res.status(500).json({ error: "Error fetching place details" });
  }
});

module.exports = router;
