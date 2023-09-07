const {createConversation, sendMessage} = require('../services/conversationService');



const createConversationHandler = async (req, res) => {
    try {
        const conversation = await createConversation(req, res);
        res.status(200).send({conversation, message: "Conversation created successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
}



module.exports = {createConversationHandler}