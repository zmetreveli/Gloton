const mongoose = require("mongoose");

const restauranteSchema = new mongoose.Schema({
  email: String,
  password: String,
  country: String,
  city: String,
  brandName: String,
  firstName: String,
  lastName: String,
  phone: String,
  category: String,
  whatsapp: Boolean,
  privacy: Boolean,
  discountCode: Boolean,
  transporte: String,
  oferta: String,
  img: {
    type: String,
    default:
      "https://images.unsplash.com/photo-1551782450-17144efb9c50?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "user", require: true },
});

const Restaurante = mongoose.model("Restaurante", restauranteSchema);
module.exports = Restaurante;
