// const multer = require("multer");

// const storage = multer.memoryStorage();

// const upload = multer({ storage });

// module.exports = upload;


import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;