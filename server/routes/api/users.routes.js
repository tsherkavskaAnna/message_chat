const express = require("express");
const router = express.Router();
const schemas = require("../../schemas/users/addUserSchema");
const { validateBody, authorized } = require("../../middleware");

const ctrl = require("../../controllers/auth/users.controller.js");
const { uploadAvatar } = require("../../middleware/uploadAvatar");

router.get("/", authorized, ctrl.getAllUsers);

router.post("/register", validateBody(schemas.addUserSchema), ctrl.register);

router.get("/verify/:veryficationCode", ctrl.veryficationEmail);

router.post(
  "/verify",
  validateBody(schemas.emailUserSchema),
  ctrl.resendVerifyEmail
);

router.post("/login", validateBody(schemas.addLoginUserSchema), ctrl.login);

router.post(
  "/forgot-password",
  validateBody(schemas.emailUserSchema),
  ctrl.forgotPassword
);

router.post("/reset-password/:token", ctrl.resetPassword);

router.get("/current", authorized, ctrl.getCurrentUser);

router.patch(
  "/current",
  authorized,
  uploadAvatar.single("file"),
  ctrl.updateUser
);

router.post("/logout", ctrl.logout);

module.exports = router;
