const mangoose = require('mongoose');


const conversationSchema = new mangoose.Schema({
    listing: {
        type: mangoose.SchemaTypes.ObjectId,
        ref: "Listing",
        required: [true, "You can't create a conversation without a listing"],
    },
    date: {
        type: mangoose.SchemaTypes.Date,
        default: Date.now(),
    
    }
});

const Conversation = mangoose.model("Conversation", conversationSchema);

module.exports = Conversation;