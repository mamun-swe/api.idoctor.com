const cloudinary = require("cloudinary").v2;
const { removeFile, parseFilename } = require("../utils/helper");

/* Cloudinary configuration */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/* Upload resource to cloudinary */
const uploadFile = async ({ file }) => {
  const response = await cloudinary.uploader.upload(file.tempFilePath);
  if (response) {
    await removeFile(file.tempFilePath);
  }

  return response.url;
};

/* Destroy resource from cloudinary */
const destroyFile = async ({ filePath }) => {
  const fileName = await parseFilename(filePath);
  return await cloudinary.uploader.destroy(fileName);
};

module.exports = {
  uploadFile,
  destroyFile,
};
