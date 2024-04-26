const Admin = require("../model/adminModel");

const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const checkEmailPasswordService = async (email, password, user) => {
  //
  if (user === "Admin") {
    //check email
    const data = await Admin.find({ email: email });
    console.log("dataaaaa", data);
    if (!data[0]) {
      return {
        error: 1,
        message: "email is not exist",
      };
    }
    // check password
    const hashPassword = data[0].password;
    const checkPassWord = bcrypt.compareSync(password, hashPassword);
    console.log("check password >>>>>>>>>", checkPassWord);
    if (!checkPassWord)
      return {
        error: 1,
        message: "invalid password",
      };
    return {
      error: 0,
      message: "Login in success",
    };
  } else {
  }
};
module.exports = checkEmailPasswordService;
