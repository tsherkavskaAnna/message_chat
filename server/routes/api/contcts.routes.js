const express = require('express');
const router = express.Router();
const schemas = require('../../schemas/contacts/addSchema');
const { validateBody, authorized } = require('../../middleware');

const ctrl = require ("../../controllers/contacts/contacts.controller.js");


router.get('/', authorized, ctrl.getAllContacts)

router.post('/', authorized, validateBody(schemas.addSchema), ctrl.createnNewContact);

router.put('/:contactId', authorized, validateBody(schemas.addSchema),  ctrl.updateContact);

router.delete('/:contactId', authorized, ctrl.deleteContact)


module.exports = router;