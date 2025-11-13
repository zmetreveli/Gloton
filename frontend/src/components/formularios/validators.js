export const emailValidator = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email) || "Email no válido";
};

export const phoneValidator = (phone) => {
  const regex = /^[0-9]{9}$/;
  return regex.test(phone) || "Numero de telefono no válido";
};

export const passwordValidator = (password) => {
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  return regex.test(password) || "Contraseña no válida";
};

const spanishCities = [
  "Madrid",
  "Barcelona",
  "Valencia",
  "Sevilla",
  "Zaragoza",
];
const frenchCities = ["Paris", "Marseille", "Lyon", "Toulouse", "Nice"];
const georgianCities = ["Tbilisi", "Batumi", "Kutaisi", "Rustavi", "Sukhumi"];
const venezuelanCities = [
  "Caracas",
  "Maracaibo",
  "Valencia",
  "Barquisimeto",
  "Maracay",
];

export const validateCity = (city) => {
  if (spanishCities.includes(city)) return true;
  if (frenchCities.includes(city)) return true;
  if (georgianCities.includes(city)) return true;
  if (venezuelanCities.includes(city)) return true;
  return "Ciudad no aceptada. Prueba con otra (Barcelona).";
};

export default {
  emailValidator,
  validateCity,
  phoneValidator,
  passwordValidator,
};
