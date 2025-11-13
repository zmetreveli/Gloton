const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  precio: Number,
  categoria: String,
  disponibilidad: Boolean,
  ingredientes: String,
  img: String,
  restaurante: {
    type: String,
    ref: "Restaurante",
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
