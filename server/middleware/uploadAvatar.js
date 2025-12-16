const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinaryConfig");

const createUpload = (folder) =>
  multer({
    storage: new CloudinaryStorage({
      cloudinary,
      params: {
        folder,
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        resource_type: "image",
      },
    }),
  });

module.exports = {
  uploadAvatar: createUpload("avatarts"),
  uploadContactImage: createUpload("contacts"),
};
