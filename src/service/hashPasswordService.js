const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
const hassPassword = async (password) => {
  const salt = await bcrypt.genSaltSync(10);
  const hash = await bcrypt.hashSync(password, salt);
  console.log(hash);
  return hash;
};
module.exports = hassPassword;
