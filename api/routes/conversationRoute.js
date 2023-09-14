const router = require('express').Router();


const {createConversationHandler, getConversationsMembershipsHandler, getMessagesHandler} = require('../controllers/conversationController');
const {verifyToken} = require('../middlewares/authMiddlewares');
const {checkConversationMembership} = require('../middlewares/conversationMiddlewares');

router.post(
    '/createConversation',
     verifyToken,
    createConversationHandler,
);

router.get(
    '/getConversationsMemberships',
    verifyToken,
    getConversationsMembershipsHandler,
)

router.get(
    '/getMessages',
    [
        verifyToken,
        checkConversationMembership
    ],
    getMessagesHandler,
)



module.exports = router;