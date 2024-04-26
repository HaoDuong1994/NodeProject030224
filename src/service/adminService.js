const Admin = require("../model/adminModel");
const createAdminService = async (reqBody, imgURL) => {
  //
  reqBody.image = imgURL;
  console.log("reqbodyyyyyyyyyyyyyy", reqBody);
  const result = await Admin.create(reqBody);
  return result;
};
const getAllAdminService = async () => {
  const result = await Admin.find({});
  return result;
};
const updateAdminService = async (id, reqBody) => {
  const result = await Admin.updateOne({ _id: id }, reqBody);
  return result;
};
const deleteAdminService = async (id) => {
  const result = await Admin.delete({ _id: id });
  return result;
};
module.exports = {
  createAdminService,
  getAllAdminService,
  updateAdminService,
  deleteAdminService,
};
