const Contact = require('../../models/Contact');

const { HttpError } = require('../../helpers');
const ctrlWrapper = require('../../helpers/controlWrapper');

const getAllContacts = async (req, res) => {
      const contacts = await Contact.find();
      return res.status(201).json({
            status: "success",
            code: 200,
            data: { contacts }
      });
}


const createnNewContact = async (req, res) => {
      const contact = new Contact(req.body);
            await contact.save();
            return res.status(201).json({
                  status: "success",
                  code: 201,
                  message: "new contact created",
                  data: { contact }
            });
}

const updateContact = async (req, res) => {
      const { contactId } = req.params;
            const contact = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
            if (!contact) {
                 throw  HttpError(404, "Not found contact");   
            }
            return res.status(201).json({
                  status: "success",
                  code: 200,
                  message: "Contact updated",
                  data: { contact }
            });
     
}


const deleteContact = async (req, res) => {
      const { contactId } = req.params;
      const contact = await Contact.findByIdAndDelete(contactId)
            if (!contact) {
                  throw HttpError(404, "Not found contact");
                  
            }
            return res.status(201).json({
                  status: "success",
                  code: 200,
                  message: "Contact deleted",
                  data: { contact }
            });
}

module.exports = {
      getAllContacts: ctrlWrapper(getAllContacts),
      createnNewContact: ctrlWrapper(createnNewContact),
      updateContact: ctrlWrapper(updateContact),
      deleteContact: ctrlWrapper(deleteContact)
}