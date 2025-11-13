const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config(); // Cargar variables de entorno

const userSchema = new Schema({
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  creditCard: { type: Object },
  role: { type: String, enum: ["USER", "RESTAURANT"], default: "USER" },
});

// Hashea la contraseña antes de guardar
userSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// Método para generar el token JWT
userSchema.methods.generateJWT = function () {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in .env");
  }

  const today = new Date();
  const expirationDate = new Date();
  expirationDate.setDate(today.getDate() + 60);

  const payload = {
    id: this._id,
    firstName: this.firstName,
    email: this.email,
    role: this.role,
  };

  return jwt.sign(payload, secret, {
    expiresIn: Math.floor(expirationDate.getTime() / 1000),
  });
};

const User = model("user", userSchema);

module.exports = User;
