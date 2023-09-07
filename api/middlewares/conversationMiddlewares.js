const ConversationMembership = require("../models/conversationMembership");


const checkConversationMembership = async (conversationId, userId) => {
    await ConversationMembership.findOne({
        conversation: conversationId,
        user: userId,
    }).then(
        (result) => {
            if (result == false) throw new Error({message: "You are not a member of this conversation"});
        }
    );
    
}


module.exports = {checkConversationMembership}