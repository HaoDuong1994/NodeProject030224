const Admin = require("../../model/adminModel");
const Customer = require("../../model/customerModel");
const checkEmailExist = async (email) => {
  try {
    const user = await Admin.findOne({ email });
    console.log("user>>>>>>>>>>>>>>", user);
    if (user)
      return {
        idUser: user._id,
        message: true,
        hashPassword: user.password,
      };
    return {
      message: false,
    };
  } catch (error) {
    console.log("error from check email service", error);
  }
};
module.exports = {
  checkEmailExist,
};
