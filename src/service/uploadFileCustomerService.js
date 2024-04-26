const path = require("path");
const singleUploadFile = async (objectFile) => {
  //
  console.log("=========================");
  const imgFile = objectFile;

  let extendName = path.extname(imgFile.name);
  let baseName = path.basename(imgFile.name, extendName);
  let finalName = `${baseName}- ${Date.now()}${extendName}`;
  let uploadpath = path.resolve(__dirname, "../public/");
  let finalPath = uploadpath + finalName;
  await imgFile.mv(finalPath);
  return {
    status: "upload sucess",
    originFileName: imgFile.name,
    path: finalName,
  };
};

const multipleUploadFile = async () => {
  //
};

module.exports = {
  singleUploadFile,
  multipleUploadFile,
};
