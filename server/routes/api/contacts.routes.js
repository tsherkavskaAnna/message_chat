const express = require("express");
const router = express.Router();
const schemas = require("../../schemas/contacts/addSchema.js");
const { validateBody, authorized } = require("../../middleware/index.js");

const ctrl = require("../../controllers/contacts/contacts.controller.js");
const { uploadContactImage } = require("../../middleware/uploadAvatar.js");

router.get("/", authorized, ctrl.getAllContacts);

router.post(
  "/",
  authorized,
  validateBody(schemas.addSchema),
  ctrl.createnNewContact
);

router.patch(
  "/:contactId",
  authorized,
  uploadContactImage.single("file"),
  ctrl.updateContact
);

router.delete("/:contactId", authorized, ctrl.deleteContact);

module.exports = router;
