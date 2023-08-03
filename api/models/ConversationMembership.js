const mangoose = require('mongoose');

const conversationMemberShipSchema = new mangoose.Schema({
    conversation: {
        type: mangoose.SchemaTypes.ObjectId,
        ref: "Conversation",
        required: [true, "You can't create a conversation membership without a conversation"],
    },
    user: {
        type: mangoose.SchemaTypes.ObjectId,
        ref: "User",
        required: [true, "You can't create a conversation membership without a user"],
    },
    anonymous: {
        type: mangoose.SchemaTypes.Boolean,
        default: false,
    },
});