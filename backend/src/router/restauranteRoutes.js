const express = require("express");
const axios = require("axios");
const router = express.Router();

const restauranteController = require("../controller/restauranteController");

// 🔍 Middleware de debug: vemos qué entra a este router
router.use((req, res, next) => {
  console.log("🛣️ [restauranteRoutes] Hit:", req.method, req.path);
  next();
});

router.post("/restaurantes/:idUser", restauranteController.createRestaurante);

router.get(
  "/restaurantes/:idUser",
  restauranteController.getRestauranteByOwnerId
);

// TODOS los restaurantes de la BBDD (HomePage usa este)
router.get("/restaurantes", restauranteController.getRestaurantes);

router.get("/restaurant/:id", restauranteController.getRestauranteById);

// Borrar restaurante
router.delete("/restaurantes/:id", restauranteController.deleteRestaurante);

// Actualizar restaurante
router.patch("/restaurantes/:id", restauranteController.updateRestaurante);

// 👉 Restaurantes de Google cerca (usa lat/lng)

router.get("/nearby", async (req, res) => {
  const { lat, lng } = req.query;
  const apiKey = process.env.GOOGLE_API_KEY;

  console.log("📡 [BACK] /nearby llamado con:", { lat, lng });

  if (!lat || !lng) {
    console.warn("⚠️ [BACK] /nearby sin lat/lng válidos");
    return res.status(400).json({ error: "lat y lng son requeridos" });
  }

  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
      {
        params: {
          location: `${lat},${lng}`,
          radius: 2000,
          type: "restaurant",
          key: apiKey,
        },
      }
    );

    console.log(
      "📦 [BACK] Google Places devolvió:",
      response.data.results?.length
    );

    res.json(response.data.results);
  } catch (error) {
    console.error("Google Places API Error:", error.toJSON?.() || error);
    res.status(500).json({ error: "Error fetching nearby restaurants" });
  }
});

module.exports = router;
