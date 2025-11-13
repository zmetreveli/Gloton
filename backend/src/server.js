const express = require("express");
const { connectDB } = require("./mongo/connection");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

const restauranteRoutes = require("../src/router/restauranteRoutes");
const productRoutes = require("./router/productRoutes");
const userRoutes = require("./router/UserRoutes");
const authRoutes = require("./router/Auth");
const orderRoutes = require("./router/orderRoutes");

app.use(cors());
app.use(express.json());
app.use(restauranteRoutes);
app.use(productRoutes);
app.use("/users", userRoutes);
app.use(authRoutes);
app.use(orderRoutes);

if (process.env.NODE_ENV !== "test") {
  connectDB().then(async (error) => {
    if (error) {
    
    }
  });
}

exports.app = app;
