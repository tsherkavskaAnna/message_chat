const express = require('express');
const router = express.Router();
const schemas = require('../../schemas/users/addUserSchema');
const { validateBody, authorized } = require('../../middleware');


const ctrl = require ("../../controllers/auth/users.controller.js");
const { AutoEncryptionLoggerLevel } = require('mongodb');


router.get('/', authorized , ctrl.getAllUsers)

router.post('/register', validateBody(schemas.addUserSchema), ctrl.register);

router.post('/login', validateBody(schemas.addLoginUserSchema), ctrl.login);

router.get('/current', authorized, ctrl.getCurrentUser);

router.post('/logout', ctrl.logout)



module.exports = router;