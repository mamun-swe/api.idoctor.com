// Single File Upload function
const fileUpload = async ({ file }) => {
  // Get file extension from filename
  const extension = file.name.split(".")[1];
  // Rename file with datetime format
  const filename = "profile_" + Date.now() + "." + extension;
  // Upload path
  path = "./uploads/" + filename;
  // Move file to path
  const moveFile = file.mv(path);

  if (!moveFile) return false;

  return filename;
};

module.exports = {
  fileUpload,
};
