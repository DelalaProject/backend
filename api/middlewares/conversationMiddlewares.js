const ConversationMembership = require("../models/conversationMembership");


const checkConversationMembership = async (req, res, next) => {
    try {await ConversationMembership.findOne({
        conversation: req.body.conversationId,
        user: req.userId,
    }).then(
        (result) => {
            if (result == false) throw new Error({message: "You are not a member of this conversation"});
            else next();
        }
    );
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: error.message});
    }
    
}


module.exports = {checkConversationMembership}