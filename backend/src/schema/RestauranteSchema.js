// const mongoose = require("mongoose");

// const restauranteSchema = new mongoose.Schema({
//   email: String,
//   password: String,
//   country: String,
//   city: String,
//   brandName: String,
//   firstName: String,
//   lastName: String,
//   phone: String,
//   category: String,
//   whatsapp: Boolean,
//   privacy: Boolean,
//   discountCode: Boolean,
//   transporte: String,
//   oferta: String,
//   img: {
//     type: String,
//     default:
//       "https://images.unsplash.com/photo-1551782450-17144efb9c50?q=80&w=2969&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//   },
//   owner: { type: mongoose.Schema.Types.ObjectId, ref: "user", require: true },
// });

// const Restaurante = mongoose.model("Restaurante", restauranteSchema);
// module.exports = Restaurante;

//! ------------------------------const mongoose = require("mongoose");-----------------

// schema/RestauranteSchema.js

// 👉 Importamos SIEMPRE mongoose desde la conexión central
const { mongoose } = require("../mongo/connection");

const restauranteSchema = new mongoose.Schema(
  {
    email: { type: String },
    password: { type: String },

    country: { type: String },
    city: { type: String },

    brandName: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String },

    category: { type: String },
    whatsapp: { type: Boolean },
    privacy: { type: Boolean },
    discountCode: { type: Boolean },

    transporte: { type: String },
    oferta: { type: String },

    img: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1551782450-17144efb9c50?q=80&w=2969&auto=format&fit=crop",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "restaurantes", // 👈 así coincide con tu error original
  }
);

// Exportar modelo
module.exports = mongoose.model("Restaurante", restauranteSchema);
