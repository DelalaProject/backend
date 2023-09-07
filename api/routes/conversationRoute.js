const router = require('express').Router();


const {createConversationHandler} = require('../controllers/conversationController');
const {verifyToken} = require('../middlewares/authMiddlewares');

router.post(
    '/createConversation',
     verifyToken,
    createConversationHandler,
);


module.exports = router;