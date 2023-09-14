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
        date: Date.now(),
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

    
    ConversationMembership.updateMany(
        {
            conversation: conversationId,
        },
        {
            latestMessageDate: Date.now(),
        },
    );


}


const getConversationsMemberships = async (userId, page) => {
    const PAGE_SIZE = 10;
    let conversationsMemberships;

    await ConversationMembership.find({
        user: userId,
    }, null, {
        sort: {latestMessageDate: -1},
        skip: page * PAGE_SIZE,
        limit: PAGE_SIZE,
    })
    .populate('conversation')
    .then((results) => {
        conversationsMemberships = results;
    })


    return conversationsMemberships;
}

const getMessages = async (conversationId, page, date) => {
    const PAGE_SIZE = 10;
    let messages;

    const filter = {
        conversation: conversationId,
    } 

    if (date) {
        const dateObj = new Date(date);
        filter.date = {$lte: dateObj};
    }

    await Message.find(
        filter, 
        null, {
        sort: {date: -1},
        skip: page * PAGE_SIZE,
        limit: PAGE_SIZE,
    })
    .populate('sender')
    .then((results) => {
        messages = results;
        console.log("count: " + results.length);
    })

    return messages;
}

module.exports = {createConversation, sendMessage, getConversationsMemberships, getMessages}