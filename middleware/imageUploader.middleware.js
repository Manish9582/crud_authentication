const multer = require('multer');
const path = require('path');
const fs = require('fs')

const filePath = path.join(__dirname, '../public/images');
if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath, { recursive: true })
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, filePath)
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname)
  },
});

const allowedMimeTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp'
];

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (allowedMimeTypes.includes(file.mimetype) && allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only JPG, JPEG, PNG, WEBP images are allowed'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
