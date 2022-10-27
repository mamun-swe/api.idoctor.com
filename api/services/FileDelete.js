const fs = require("fs");

const fileDelete = async ({ file }) => {
  fs.unlink("./uploads/" + file, function (err) {
    return;
  });
};

module.exports = {
  fileDelete,
};
