const express = require("express");
const { connectDB } = require("./mongo/connection");
const cors = require("cors");
const app = express();
require("dotenv").config(); // ✅ Asegúrate de cargar variables de entorno

// Importar rutas
const orderRouter = require("./router/UserRoutes");
const restauranteRoutes = require("../src/router/restauranteRoutes");
const placesRoutes = require("./router/PlacesRoutes");
const productRoutes = require("./router/productRoutes");
const userRoutes = require("./router/UserRoutes");
const authRoutes = require("./router/Auth");
const orderRoutes = require("./router/orderRoutes");
const googlePlacesRoutes = require("./router/googlePlaces"); // ✅ Ruta Google

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/google-places", googlePlacesRoutes); // ✅ solo una vez
app.use("/api", placesRoutes);
app.use(restauranteRoutes);
app.use(productRoutes);
app.use("/users", userRoutes);
app.use(authRoutes);
app.use(orderRoutes);

// Conexión DB y lanzamiento del servidor
connectDB().then(() => console.log("Connected to database!"));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Server is up and running ⚡");
});
