const mongoose = require("mongoose"); 

const messageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true,
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        type: String,
        default: ""
    },
    fileUrl: {
        type: String
    },
    fileType: {
        type: String
    },
    read: {
        type: Boolean,
        default: false
    },
    readAt: {
        type: Date
    }

}, {timestamps: true})

module.exports = mongoose.model("Message", messageSchema)