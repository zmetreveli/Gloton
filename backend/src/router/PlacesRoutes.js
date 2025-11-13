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

module.exports = router;
