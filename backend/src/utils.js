const bcrypt = require("bcryptjs");

const encryptValue = async (value) => {
  const result = await bcrypt.hash(value, 10);
  return result;
};

module.exports = {
  encryptValue,
};
