const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

router.get("/autocomplete", async (req, res) => {
  const input = req.query.input;

  if (!input) return res.status(400).json({ error: "Missing input" });

  const body = {
    input: input,
    locationBias: {
      rectangle: {
        low: { latitude: 40.0, longitude: -4.0 },
        high: { latitude: 43.0, longitude: -1.0 },
      },
    },
  };

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places:autocomplete?key=${GOOGLE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Google API error", details: err.message });
  }
});

// --------------------------------------
// 2) NUEVA RUTA: GEOCODING DE UNA DIRECCIÓN
// --------------------------------------
router.get("/geocode", async (req, res) => {
  const { text } = req.query;

  if (!text) {
    return res.status(400).json({ error: "Missing 'text' parameter" });
  }

  try {
    console.log("📡 [BACK] Geocoding:", text);

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      text
    )}&key=${GOOGLE_API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    const first = data.results?.[0];

    if (!first || !first.geometry || !first.geometry.location) {
      console.warn("⚠️ [BACK] No coords found for:", text);
      return res.status(404).json({
        error: "No coordinates found for that address",
      });
    }

    const { lat, lng } = first.geometry.location;

    console.log("📍 [BACK] Coords found:", { lat, lng });

    return res.json({ lat, lng });
  } catch (err) {
    console.error("❌ [BACK] Error in /geocode:", err);
    res.status(500).json({ error: "Error geocoding address" });
  }
});

module.exports = router;
