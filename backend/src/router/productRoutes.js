const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProductById);
router.post("/products", productController.createProduct);
router.patch("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);
router.get(
  "/restaurantes/:restauranteId/products",
  productController.getProductsByRestaurantId
);

module.exports = router;
