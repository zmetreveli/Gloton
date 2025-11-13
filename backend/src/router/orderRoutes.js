
const express = require("express");
const router = express.Router();
const orderController = require("../controller/orderController");

router.get("/orders", orderController.getOrders);
router.get("/orders/:id", orderController.getOrderById);
router.post("/orders", orderController.createOrder);
router.patch("/orders/:id", orderController.updateOrder);
router.delete("/orders/:id", orderController.deleteOrder);
router.get(
  "/restaurantes/:restauranteId/orders",
  orderController.getOrdersByRestaurantId
);
router.get("/users/:userId/orders", orderController.getOrdersByUserId);

module.exports = router;

