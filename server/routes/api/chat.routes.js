const express = require('express');
const router = express.Router();
const { authorized } = require('../../middleware');

const ctrl = require("../../controllers/chat/chat.controller.js");
const uploadCloud = require("../../middleware/uploadCloudinary.js");


router.get('/messages/:contactId', authorized, ctrl.getMessagesByUserId);

router.post('/send/:contactId', authorized, uploadCloud.single("file"), ctrl.sendMessage);

router.get('/all', authorized, ctrl.getAllMessages);

module.exports = router;
