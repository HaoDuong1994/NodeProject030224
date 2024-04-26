const path = require("path");
const uploadSingleFile = async (objectFile, adminPath) => {
  try {
    let originalFileName = objectFile.name;
    let extendName = path.extname(objectFile.name);
    let baseName = path.basename(objectFile.name, extendName);
    const uploadPath = path.resolve(__dirname, `../views/${adminPath}`);
    let finalName = `${baseName}-${Date.now()}${extendName}`;
    let finalPath = uploadPath + "/" + finalName;
    /// imgage : hinh-1987585-png
    await objectFile.mv(finalPath);
    return {
      status: "success",
      originFileName: originalFileName,
      path: finalName,
    };
  } catch (error) {
    console.log("error from upload file service", error);
  }
};
const uploadMultipleFile = async (arrayFile, adminPath) => {
  //
  let arrayImage = [];
  arrayFile.forEach(async (fileImage, index) => {
    let originImageName = fileImage.name;
    let extendName = path.extname(originImageName);
    let baseName = path.basename(originImageName, extendName);
    let uploadPath = path.resolve(__dirname, `../views/${adminPath}`);
    let finalName = `${baseName}-${Date.now()}${extendName}`;
    let finalPath = uploadPath + "/" + finalName;
    let objectImage = {
      id: index,
      originPath: originImageName,
      path: finalName,
    };
    arrayImage.push(objectImage);
    await fileImage.mv(finalPath);
  });
  return arrayImage;
};
module.exports = {
  uploadSingleFile,
  uploadMultipleFile,
};
