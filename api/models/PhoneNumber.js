const mongoose = require('mongoose');


const phoneNumberSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, "User is required"],
        ref: "User",
    },
    number: {
        type: mongoose.SchemaTypes.String,
        required: [true, "Phone number is required"],
    },
    code: {
        type: mongoose.SchemaTypes.Number,
        default: 213,
    }
});

const PhoneNumber = mongoose.model("PhoneNumber", phoneNumberSchema);

module.exports = PhoneNumber;