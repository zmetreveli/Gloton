const express = require("express");
const axios = require("axios");
const router = express.Router();
const restauranteController = require("../controller/restauranteController");

router.post("/restaurantes/:idUser", restauranteController.createRestaurante);
router.get(
  "/restaurantes/:idUser",
  restauranteController.getRestauranteByOwnerId
);
router.get("/restaurantes", restauranteController.getRestaurantes);

router.get("/restaurant/:id", restauranteController.getRestauranteById);
router.delete("/restaurantes/:id", restauranteController.deleteRestaurante);
router.patch("/restaurantes/:id", restauranteController.updateRestaurante);

router.get("/nearby", async (req, res) => {
  const { lat, lng } = req.query;
  const apiKey = process.env.GOOGLE_API_KEY; // tu .env del backend

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

    res.json(response.data.results);
  } catch (error) {
    console.error("Google Places API Error:", error);
    res.status(500).json({ error: "Error fetching nearby restaurants" });
  }
});

module.exports = router;

module.exports = router;
