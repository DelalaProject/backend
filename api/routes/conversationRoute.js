const router = require('express').Router();


const {createConversationHandler, sendMessageHandler} = require('../controllers/conversationController');
const {verifyToken} = require('../middlewares/authMiddlewares');


router.post('/createConversation', verifyToken, createConversationHandler);

router.post('/sendMessage', verifyToken, sendMessageHandler);

module.exports = router;