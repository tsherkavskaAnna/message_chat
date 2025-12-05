const Contact = require('../../models/Contact');

const { HttpError } = require('../../helpers');
const ctrlWrapper = require('../../helpers/controlWrapper');

const getAllContacts = async (req, res) => {
      const contacts = await Contact.find({ owner: req.user._id });
      return res.status(201).json({
            status: "success",
            code: 200,
            data: { contacts }
      });
}


const createnNewContact = async (req, res) => {
      const contact = await Contact.create({
            ...req.body,
            owner: req.user._id
      });
      
            return res.status(201).json({
                  status: "success",
                  code: 201,
                  message: "new contact created",
                  data: { contact }
            });
}

const updateContact = async (req, res) => {
      const { contactId } = req.params;
      const contact = await Contact.findOneAndUpdate(
            { _id: contactId, owner: req.user._id },  
            req.body,
            { new: true }
      );

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
      const contact = await Contact.findOneAndDelete(
            { _id: contactId, owner: req.user._id });

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