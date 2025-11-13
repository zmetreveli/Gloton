const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productList: Array,
  address: String,
  date: String,
  billing: Object,
  restaurante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurante",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
