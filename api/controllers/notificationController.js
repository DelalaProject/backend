const {pushNotification, getNotifications, isThereUnreadNotification, setNotitificationsSeen} = require('../services/notificationService');


const pushNotificationHandler = async (req, res) => {
    try {
        const notification = await pushNotification(req.body.title, req.body.content, req.body.room);
        res.status(200).send({notification, message: "Notification pushed successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
}

const getNotificationsHandler = async (req, res) => {
    try {
        const notifications = await getNotifications(req.userId, req.query.page);
        res.status(200).send({notifications, message: "Notifications fetched successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
}

const isThereUnreadNotificationHandler = async (req, res) => {
    try {
        const thereIs = await isThereUnreadNotification(req.userId);
        res.status(200).send({thereIs, message: "Unread notifications checked successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
}

const setNotitificationsSeenHandler = async (req, res) => {
    try {
        await setNotitificationsSeen(req.userId);
        res.status(200).send({message: "Notifications set as seen successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
}



module.exports = {pushNotificationHandler}