const Notification = require('../models/Notification');
const RecievedNotification = require('../models/RecievedNotification');
const {getIo} = require('./socketIoService');

const pushNotification = async (title, content, room) => {
    const notification = new Notification({
        title: title,
        content: content,
    });

    await notification.save();

    const io = getIo();
    io.to(room).emit("notification", notification);
    
    const userSockets = io.sockets.adapter.rooms.get(room);
    const allSockets = io.sockets.sockets;
    for (const socketId of userSockets ) {
        const socket = await allSockets.get(socketId);
        const recievedNotification = new RecievedNotification({
            notification: notification._id,
            user: socket.decoded_token.id,
        })
        recievedNotification.save();
    }

    return notification;
}

const getNotifications = async (userId, page) => {
    const PAGE_SIZE = 10;
    let notifications;

    await Notification.find(
        {user: userId},
        null,
        {
            sort: {date: 1},
            skip: page * PAGE_SIZE,
            limit: PAGE_SIZE,
        }).then(
        (result) => {
            notifications = result;
        }
    );

    return notifications;
}

const isThereUnreadNotification = async (userId) => {
    let thereIs = false;
    await RecievedNotification.findOne({user: userId, seen: false}).then((result) => {
        if (result) thereIs = true;
    });

    return thereIs;
}

const setNotitificationsSeen = async (userId) => {
    await RecievedNotification.updateMany({user: userId, seen: false}, {seen: true});
}

module.exports = {pushNotification, getNotifications, isThereUnreadNotification, setNotitificationsSeen}