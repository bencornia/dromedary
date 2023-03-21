const fs = require("fs");
const path = require("path");

function deleteImageFromServer(imageName) {
  // Early return if path is null
  if (!imageName) {
    return;
  }

  const filePath = path.join(__dirname, "..", "uploads", imageName);

  fs.unlink(filePath, (err) => {
    console.log(err);
    return;
  });
}

module.exports = { deleteImage: deleteImageFromServer };
