const router = require('express').Router();

const {pushNotificationHandler} = require('../controllers/notificationController');

router.post(
    '/pushNotification',
    pushNotificationHandler,
)

module.exports = router;