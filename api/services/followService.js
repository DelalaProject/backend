const Follow = require("../models/Follow");
const {getIo} = require('../services/socketIoService');


const follow = async (req, res) => {
    

    const follow = new Follow({
        follower: req.userId,
        followed: req.body.followedId,
    });

    const io = getIo();
    const userSockets = io.sockets.adapter.rooms.get(req.userId.toString());
    const allSockets = io.sockets.sockets;
    for (const socketId of userSockets ) {
        const socket = await allSockets.get(socketId);
        socket.join(req.body.followedId.toString() + "followers");
    }

    await follow.save();

    return follow;
}

const unfollow = async (req, res) => {
    
    const io = getIo();
    const userSockets = io.sockets.adapter.rooms.get(req.userId.toString());
    const allSockets = io.sockets.sockets;
    for (const socketId of userSockets ) {
        const socket = await allSockets.get(socketId);
        socket.leave(req.body.followedId.toString() + "followers");
    }
    await Follow.deleteOne({follower: req.userId, followed: req.body.followedId});
    
}

const getFollowings = async (req, res) => {
    let followings;

    await Follow.find({follower: req.userId}).then(
        (result) => {
            followings = result;
        }
    );

    return followings;
}

module.exports = {follow, unfollow, getFollowings}