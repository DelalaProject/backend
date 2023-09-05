const mangoose = require('mongoose');


const messageSchema = new mangoose.Schema({
    conversation: {
        type: mangoose.SchemaTypes.ObjectId,
        ref: "Conversation",
        required: [true, "You can't create a message without a conversation"],
    },
    sender: {
        type: mangoose.SchemaTypes.ObjectId,
        ref: "User",
        required: [true, "You can't create a message without a sender"],
    },
    content: {
        type: mangoose.SchemaTypes.String,
        required: [true, "You can't create a message without a content"],
    },
    date: {
        type: mangoose.SchemaTypes.Date,
        default: Date.now(),
    }

});

const Message = mangoose.model("Message", messageSchema);

module.exports = Message;