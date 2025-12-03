const mongoose = require("mongoose");   

const contactSchema = new mongoose.Schema({
    connectCode: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
    },
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
        trim: true,
        lowercase: true,
    },
    image: {
        type: String,
    }
    },
    {timestamps: true}
)
module.exports = mongoose.model("Contact", contactSchema);

