const bcrypt = require("bcryptjs");
const comparePassword = async (userPassword, hashPassword) => {
  const result = bcrypt.compare(userPassword, hashPassword);
  return result;
};

module.exports = {
  comparePassword,
};
