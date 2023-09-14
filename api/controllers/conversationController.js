const {createConversation, getConversationsMemberships, getMessages} = require('../services/conversationService');



const createConversationHandler = async (req, res) => {
    try {
        const conversation = await createConversation(req, res);
        res.status(200).send({conversation, message: "Conversation created successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
}

const getConversationsMembershipsHandler = async (req, res) => {
    try {
        const conversationMemberships = await getConversationsMemberships(req.userId, req.body.page);
        res.status(200).send({conversationMemberships, message: "Conversation memberships fetched successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
}

const getMessagesHandler = async (req, res) => {
    try {
        const messages = await getMessages(req.body.conversationId, req.body.page, req.body.date);
        res.status(200).send({messages, message: "Messages fetched successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
}



module.exports = {createConversationHandler, getConversationsMembershipsHandler, getMessagesHandler}