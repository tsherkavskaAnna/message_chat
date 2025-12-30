const Chat = require("../../models/Chat");
const Message = require("../../models/Message");
const Contact = require("../../models/Contact");
const User = require("../../models/user");
const { getIO } = require("../../utils/socket");
const ctrlWrapper = require("../../helpers/controlWrapper");
const mongoose = require("mongoose");

const getOrCreateChat = async (currentUserId, contactId) => {
  const contact = await Contact.findById(contactId);
  if (!contact) throw new Error("Contact not found");

  const receiver = await User.findOne({ email: contact.email });
  if (!receiver) throw new Error("User not found");

  const participantsKey = [currentUserId.toString(), receiver._id.toString()]
    .sort()
    .join("_");

  let chat = await Chat.findOne({ participantsKey });
  if (!chat) {
    chat = await Chat.create({
      participants: [currentUserId, receiver._id],
      participantsKey,
      lastMessage: null,
    });
  }

  return chat;
};

//ricevere massagi di user logato con paginazione
const getMessagesByUserId = async (req, res) => {
  const currentUserId = new mongoose.Types.ObjectId(req.user._id).toString();
  const receiverId = new mongoose.Types.ObjectId(
    req.params.contactId
  ).toString();

  const limit = Number(req.query.limit) || 5;
  const page = Number(req.query.page) || 1;
  const skip = (page - 1) * limit;

  const chat = await getOrCreateChat(currentUserId, req.params.contactId);
  const messages = await Message.find({
    chatId: chat._id,
  })
    .sort({ createdAt: 1 })
    .skip(skip)
    .limit(limit);

  await Message.updateMany(
    { chatId: chat._id, read: false, senderId: { $ne: currentUserId } },
    { $set: { read: true, readAt: new Date() } }
  );

  res.status(200).json({
    status: "success",
    chatId: chat._id,
    messages,
    page,
    limit,
  });
};

//cercare chat esistente o creare nuovo per inviatre massagio con file (imagini)
const sendMessage = async (req, res) => {
  const currentUserId = new mongoose.Types.ObjectId(req.user._id).toString();
  const receiverId = new mongoose.Types.ObjectId(
    req.params.contactId
  ).toString();
  let tempId = req.body.tempId;
  if (!tempId && req.body.get) {
    tempId = req.body.get("tempId");
  }
  const { text } = req.body;

  let fileUrl = null;
  let fileType = null;

  if (req.file) {
    fileUrl = req.file.path || req.file.secure_url || null;
    fileType = req.file.mimetype ? req.file.mimetype.split("/")[0] : null;
  }
  const chat = await getOrCreateChat(currentUserId, req.params.contactId);
  const message = await Message.create({
    chatId: chat._id,
    senderId: currentUserId,
    text,
    fileUrl,
    fileType,
  });

  chat.lastMessage = message._id;
  await chat.save();
  getIO()
    .to(chat._id.toString())
    .emit("chat_updated", {
      chatId: chat._id,
      lastMessage: {
        text: message.text,
        createdAt: message.createdAt,
        senderId: message.senderId,
      },
    });
  const fullMessage = { ...message.toObject(), tempId };
  getIO().to(chat._id.toString()).emit("receive_message", fullMessage);

  res.status(201).json({
    status: "success",
    message: "new message sent",
    data: { message },
  });
};

//Modificare massagio di user logato
const editMessage = async (req, res) => {
  const messageId = req.params.messageId;
  const { text } = req.body;
  const file = req.file;

  if (!text && !file) {
    return res.status(400).json({ message: "Text or file is required" });
  }

  const updateData = {};
  if (text) updateData.text = text;
  if (file) updateData.fileUrl = file.path;
  if (file) updateData.fileType = file.mimetype.split("/")[0];

  const message = await Message.findByIdAndUpdate(messageId, updateData, {
    new: true,
  });

  if (!message) return res.status(404).json({ message: "Message not found" });

  getIO().to(message.chatId.toString()).emit("editMessage", message);

  res.status(200).json({ status: "success", message });
};

const deleteMessage = async (req, res) => {
  const messageId = req.params.messageId;
  const message = await Message.findByIdAndDelete(messageId);
  if (!message) {
    return res
      .status(404)
      .json({ status: "error", message: "Message not found" });
  }
  getIO().to(message.chatId.toString()).emit("deleteMessage", { messageId });
  res.status(200).json({
    status: "success",
    message: "Message deleted",
  });
};

//Vedere tutti chat di user logato
const getAllMessages = async (req, res) => {
  const currentUserId = req.user._id;
  const chats = await Chat.find({
    participants: currentUserId,
  })
    .populate({
      path: "participants",
      select: "fullName username image",
    })
    .populate({
      path: "lastMessage",
      select: "text createdAt senderId",
    });

  const result = chats.map((chat) => {
    const otherContact = chat.participants.find(
      (contact) => contact._id.toString() !== currentUserId.toString()
    );

    return {
      chatId: chat._id,
      fullname: otherContact?.fullName || "",
      username: otherContact?.username,
      avatarImage: otherContact?.avatarImage,
      lastMessage: chat.lastMessage || null,
    };
  });
  res.json({
    status: "success",
    chats: result,
  });
};

module.exports = {
  getMessagesByUserId: ctrlWrapper(getMessagesByUserId),
  sendMessage: ctrlWrapper(sendMessage),
  editMessage: ctrlWrapper(editMessage),
  deleteMessage: ctrlWrapper(deleteMessage),
  getAllMessages: ctrlWrapper(getAllMessages),
};
