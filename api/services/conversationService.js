const Conversation = require('../models/Conversation');
const ConversationMembership = require('../models/conversationMembership');
const mongoose = require('mongoose');
const Message = require('../models/Message');
const User = require('../models/User');
const Listing  = require('../models/Listing');



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

const sendMessage = async (content, conversationId, userId, io) => {
    const message = new Message({
        conversation: conversationId,
        sender: userId,
        content: content,
    });

    await message.save();

    ConversationMembership.findOne({
        conversation: conversationId,
        user: {$ne: userId}
    }).then(
        async (result) => {
            console.log("receiver: "+result.user);
            io.to(result.user.toString()).emit("newMessage", message);
        }
    )

}


const getConversationsMemberships = async (req, res) => {
    let conversationsMemberships;

    await ConversationMembership.find({
        user: req.userId,
    })
    .populate('conversation')
    .then((results) => {
        conversationsMemberships = results;
    })


    return conversationsMemberships;
}

const getMessages = async (req, res) => {
    let messages;

    await Message.find({
        conversation: req.body.conversationId,
    })
    .populate('sender')
    .then((results) => {
        messages = results;
    })
}

module.exports = {createConversation, sendMessage}