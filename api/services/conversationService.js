const Conversation = require('../models/Conversation');
const ConversationMembership = require('../models/ConversationMembership');
const Message = require('../models/Message');
const User = require('../models/User');
const io = require('../../index.js').io;



const createConversation = async (req, res) => {
    const conversation = new Conversation({
        listing: req.body.listingId,
    });

    await conversation.save();

    let conversationMembership = new ConversationMembership({
        conversation: conversation._id,
        user: req.userId,
        anonymous: req.body.isUserAnonymous,
    });

    await conversationMembership.save();

    conversationMembership = new ConversationMembership({
        conversation: conversation._id,
        user: req.body.listingUserId,
        anonymous: req.body.isListingAnonymous,
    });

    
    await conversationMembership.save();

    return conversation;
}

const sendMessage = async (req, res) => {
    const message = new Message({
        conversation: req.body.conversationId,
        sender: req.userId,
        content: req.body.content,
    });

    await message.save();

    ConversationMembership.find({conversation: req.body.conversationId}).then(
        async (result) => {
            result.filter((membership) => membership.user != req.userId);
            io.to(result[0].user.toString).emit("newMessage", message);
        }
    )



    return message;
}