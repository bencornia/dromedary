const multer = require("multer");
const path = require("path");

function fileFilter(req, file, cb) {
  // Only allow png, jpg, or jpeg
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only .png, .jpg, and .jpeg format allowed!"));
  }
}

function fileName(req, file, cb) {
  const uniqueSuffix = Date.now();
  const ext = path.extname(file.originalname);

  // Normalize business name
  const businessName = req.body.businessName
    .trim()
    .toLowerCase()
    .replaceAll(/[\"\'\\\/]/g, "")
    .replaceAll(/\s+/g, "-");

  const profileImagePath = `${file.fieldname}-${businessName}-${uniqueSuffix}${ext}`;
  req.body.profileImagePath = profileImagePath;
  cb(null, profileImagePath);
}

function destination(req, file, cb) {
  cb(null, "uploads/");
}

/**
 Returns a middleware for uploading files from an incoming request.
 */
function uploadImageFileWrapper(fieldname) {
  const storage = multer.diskStorage({
    destination: destination,
    filename: fileName,
  });

  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 200000 },
  }).single(fieldname);

  return (req, res, next) => {
    upload(req, res, (err) => {
      // Check for any errors during upload
      if (err instanceof multer.MulterError) {
        return res.status(500).json({ error: err.message });
      } else if (err) {
        return res.status(500).json({ error: err });
      }

      // Continue
      next();
    });
  };
}

module.exports = { uploadImageFileWrapper };
