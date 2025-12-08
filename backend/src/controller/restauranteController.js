const Restaurante = require("../schema/RestauranteSchema");
const User = require("../schema/usersSchema");
const { encryptValue } = require("../utils");

exports.createRestaurante = async (req, res) => {
  const idUser = req.params.idUser;

  try {
    const isUser = await User.findById(idUser);

    if (!isUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (isUser.role !== "RESTAURANT") {
      return res.status(403).json({ message: "Not valid role" });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Provide email, password" });
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Provide a valid email address." });
    }

    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.",
      });
    }

    const foundRestaurante = await Restaurante.findOne({ email });

    if (foundRestaurante) {
      return res.status(400).json({ message: "User already exists." });
    }

    const encryptedPassword = await encryptValue(password);

    const newRestaurante = await Restaurante.create({
      ...req.body,
      password: encryptedPassword,
      owner: idUser,
    });

    return res.status(201).json(newRestaurante);
  } catch (err) {
    console.error("❌ Error in createRestaurante:", err);
    return res.status(500).json({ error: err.message });
  }
};

exports.getRestaurantes = async (req, res) => {
  console.log("📥 Controller: getRestaurantes");

  try {
    const restaurantes = await Restaurante.find();

    console.log(`📤 Enviando ${restaurantes.length} restaurantes desde BBDD`);
    return res.json(restaurantes);
  } catch (err) {
    console.error("❌ Error en getRestaurantes:", err);
    return res.status(500).json({
      message: "Error obteniendo restaurantes",
      error: err.message,
    });
  }
};

exports.getRestauranteById = async (req, res) => {
  const restauranteId = req.params.id;

  try {
    const foundRestaurante = await Restaurante.findById(restauranteId);

    if (foundRestaurante) {
      return res.json(foundRestaurante);
    }

    return res.status(404).json({ error: "Restaurante no encontrado" });
  } catch (err) {
    console.error("❌ Error en getRestauranteById:", err);
    return res.status(500).json({ error: err.message });
  }
};

exports.getRestauranteByOwnerId = async (req, res) => {
  const ownerId = req.params.idUser;

  try {
    const restaurantes = await Restaurante.find({ owner: ownerId });
    return res.json(restaurantes);
  } catch (err) {
    console.error("❌ Error en getRestauranteByOwnerId:", err);
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteRestaurante = async (req, res) => {
  const restauranteId = req.params.id;

  try {
    const deletedRestaurante = await Restaurante.findByIdAndDelete(
      restauranteId
    );

    if (deletedRestaurante) {
      return res.json({
        message: "Restaurante deleted successfully",
        deletedRestaurante,
      });
    }

    return res.status(404).json({ error: "Restaurante not found" });
  } catch (err) {
    console.error("❌ Error en deleteRestaurante:", err);
    return res.status(500).json({ error: err.message });
  }
};

exports.updateRestaurante = async (req, res) => {
  const restauranteId = req.params.id;
  const updates = req.body;

  try {
    const updatedRestaurante = await Restaurante.findByIdAndUpdate(
      restauranteId,
      updates,
      { new: true }
    );

    if (updatedRestaurante) {
      return res.json({
        message: "Restaurante updated successfully",
        updatedRestaurante,
      });
    }

    return res.status(404).json({ error: "Restaurante not found" });
  } catch (err) {
    console.error("❌ Error en updateRestaurante:", err);
    return res.status(500).json({ error: err.message });
  }
};
