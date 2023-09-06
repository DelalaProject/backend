const Conversation = require('../models/Conversation');
const ConversationMembership = require('../models/ConversationMembership');
const mongoose = require('mongoose');
const Message = require('../models/Message');
const User = require('../models/User');
const Listing  = require('../models/Listing');
const {getIo} = require('../services/socketIoService');



const createConversation = async (req, res) => {
    const conversation = new Conversation({
        listing: req.body.listingId,
    });

    
    await conversation.save();

    let listing;

    await Listing.findById(req.body.listingId).then(
        (result) => {
            listing = result;
        }        
    )


    let conversationMembership = new ConversationMembership({
        conversation: conversation._id,
        user: req.userId,
        anonymous: req.body.isUserAnonymous,
    });

    await conversationMembership.save();

    conversationMembership = new ConversationMembership({
        conversation: conversation._id,
        user: listing.user,
        anonymous: listing.anonymous,
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

    ConversationMembership.findOne({
        conversation: req.body.conversationId,
        user: {$ne: req.userId}
    }).then(
        async (result) => {
            io = getIo();
            // console.log("the receiver is: "+result);
            console.log("the room is: "+result.user.toString());
            io.to(result.user.toString()).emit("newMessage", message);
        }
    )



    return message;
}


module.exports = {createConversation, sendMessage}