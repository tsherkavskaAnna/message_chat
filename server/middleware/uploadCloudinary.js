const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinaryConfig");

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
    folder: "chat_message", // Optional: specify a folder in your Cloudinary library
    allowed_formats: ["jpg", "png", "mp4", "pdf"], // Optional: restrict file formats
    resource_type: "auto", // Automatically detects image, video, or raw
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;


