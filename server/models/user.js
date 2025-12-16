const mongoose = require("mongoose");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: emailRegexp,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    avatarImage: {
      type: String,
      default: "",
    },
    veryficationCode: {
      type: String,
      default: "",
    },
    verify: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
