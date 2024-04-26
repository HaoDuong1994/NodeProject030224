const {
  createAdminService,
  getAllAdminService,
  updateAdminService,
  deleteAdminService,
} = require("../service/adminService");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { comparePassword } = require("../service/comparePasswordService");
const { checkEmailExist } = require("../service/check service/checkEmail");
const {
  uploadSingleFile,
  uploadMultipleFile,
} = require("../service/uploadFileService");
const hassPassword = require("../service/hashPasswordService");
const checkEmailPasswordService = require("../service/checkEmailPassword");
const createAdminController = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        EC: 1,
        message: "You need upload Image profile",
      });
    } else {
      // Check password exist from database
      const isEmailExist = await checkEmailExist(req.body.email);
      if (isEmailExist)
        return res.status(400).json({
          message: "Your email have been regristed already, please try again",
        });
      // //Hash password
      let passWord = await hassPassword(req.body.password);
      req.body.password = passWord;
      //Resolve file upload
      const fileImage = req.files.image;
      const adminImgePath = "adminProfileImage";
      if (Array.isArray(fileImage)) {
        let arrayImgUrl = [];
        const result = await uploadMultipleFile(fileImage, adminImgePath);
        result.forEach((element) => {
          arrayImgUrl.push(element.path);
        });
        console.log(arrayImgUrl);
        const data = await createAdminService(req.body, arrayImgUrl);
        res.status(200).json({
          EC: 0,
          dataUser: data,
        });
      } else {
        let imgUrl = "";
        let resultUploadFile = await uploadSingleFile(fileImage, adminImgePath);
        imgUrl = resultUploadFile.path;
        const resultCreateAdmin = await createAdminService(req.body, imgUrl);
        res.status(200).json({
          EC: 0,
          dataUser: resultCreateAdmin,
        });
      }
    }
  } catch (error) {
    console.log("error from create adminController", error);
    res.status(400).json({
      Error: JSON.stringify(error),
    });
  }
};
const getAdminController = async (req, res) => {
  try {
    const result = await getAllAdminService();
    res.status(200).json({
      EC: 0,
      data: result,
    });
  } catch (error) {
    res.json({
      error: JSON.stringify(error),
    });
  }
};
const updateAdminController = async (req, res) => {
  try {
    const id = req.body.id;
    delete req.body.id;
    const result = await updateAdminService(id, req.body);
    res.status(200).json({
      EC: 0,
      result: result,
    });
  } catch (error) {
    console.log("error from update admin controller", error);
    res.json({
      error: JSON.stringify(error),
    });
  }
};
const uploadFileController = async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    }
    let arrayFile = req.files.image;
    if (Array.isArray(arrayFile)) {
      //
      let result = await uploadMultipleFile(arrayFile);
      res.status(200).json({
        EC: 0,
        result: result,
      });
    } else {
      //
      let result = await uploadSingleFile(req.files);
      res.status(200).json({
        result: result,
      });
    }
  } catch (error) {
    console.log("error fromn upload file controller ", error);
  }
};
const deleteAdminController = async (req, res) => {
  //
  try {
    const id = req.body.id;
    const result = await deleteAdminService(id);
    res.status(200).json({
      EC: 0,
      status: result,
    });
  } catch (error) {
    res.status(200).json({
      EC: 1,
      error: JSON.stringify(error),
    });
  }
};
const loginAdminController = async (req, res) => {
  //
  try {
    //
    let adminPassWord = req.body.password;
    let adminEmail = req.body.email;
    let user = req.body.user;
    if (!adminPassWord && !adminEmail) {
      return res.status(500).json({
        Error: 1,
        message: "Input email or password can not be empty",
      });
    }
    const result = await checkEmailPasswordService(
      adminEmail,
      adminPassWord,
      user
    );
    res.status(200).json({
      status: result,
    });
  } catch (error) {
    //
    res.status(400).json({
      error: 1,
      message: JSON.stringify(error),
    });
  }
};

//Page

const adminLoginController = async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    //Check email
    const userStatus = await checkEmailExist(email);
    console.log("userStatus >>>>>>>>>>>", userStatus);
    console.log("userEmail", userStatus.message);
    switch (userStatus.message) {
      case true:
        //move to check password
        const { hashPassword } = userStatus;
        const passwordChecking = await comparePassword(password, hashPassword);
        console.log("password check ing", passwordChecking);
        if (passwordChecking) {
          // create token
          const privatekey = process.env.PRIVATE_KEY;
          const expireDay = 3 * 24 * 60 * 60;
          const token = jwt.sign(
            {
              id: userStatus.idUser,
            },
            privatekey,
            { expiresIn: expireDay }
          );

          res.cookie("jwt", token, {
            httpOnly: true,
          });
          res.redirect("/adminProductsPage");
        } else {
          res.send("invalid password");
        }
        break;
      case false:
        res.send("invalid email");
        break;
    }
  } catch (error) {
    res.status(400).json({
      EC: 1,
      message: JSON.stringify(error),
    });
  }
};
module.exports = {
  createAdminController,
  getAdminController,
  updateAdminController,
  uploadFileController,
  deleteAdminController,
  loginAdminController,
  adminLoginController,
};
