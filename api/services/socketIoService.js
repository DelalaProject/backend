const socketIo = require('socket.io');
const Follow = require('../models/Follow.js');
const ConversationMembership = require('../models/conversationMembership.js');
const socketIoJwt = require('socketio-jwt');
const jwtSecretKey = require('../../config/auth_config.js').jwtSecretKey;
const {checkConversationMembership} = require('../middlewares/conversationMiddlewares');
const {sendMessage} = require('../services/conversationService');

let io;





const initSocket = (server) => {


    io = socketIo(server);
    io.use(
        socketIoJwt.authorize({
            secret: jwtSecretKey,
            handshake: true,
        })
    );

    io.on(
        "notification",
        (data) => {
            console.log(data);
        }
    )
    
io.on(
    "connection",
    (socket) => {

        // console.log("connected: " + socket.decoded_token.id.toString());
        

        socket.join(socket.decoded_token.id.toString());
        Follow.find({follower: socket.decoded_token.id}).then(
            (result) => {
                result.forEach(
                    (follow) => {
                        socket.join(follow.followed.toString() + "followers");
                    }
                );
            }
        );

        socket.on(
            "newMessage",
            async (data) => {
                try {
                    await ConversationMembership.findOne({
                        conversation: data.conversationId,
                        user: socket.decoded_token.id,
                    }).then(
                        (result) => {
                            if (result == false) throw new Error({message: "You are not a member of this conversation"});
                        }
                    );
                    // await checkConversationMembership(data.conversationId, socket.decoded_token.id);
                    await sendMessage(data.content, data.conversationId, socket.decoded_token.id, io);
                    
                } catch (error) {
                    console.log(error);
                    socket.emit("error_sending_message", 
                    {
                        message: error.message,
                    });
                }
            }
        )






    }
);

    return io;
}

const getIo = () => {
    if(!io){
        throw new Error('Socket.io not initialized');
    }
    return io;
}

const joinRoom = async (roomId, userId) => {
    const userSockets = io.sockets.adapter.rooms.get(userId.toString());
    const allSockets = io.sockets.sockets;
    for (const socketId of userSockets ) {
        const socket = await allSockets.get(socketId);
        socket.join(roomId.toString());
    }
}

const leaveRoom = async (roomId, userId) => {
    const userSockets = io.sockets.adapter.rooms.get(userId.toString());
    const allSockets = io.sockets.sockets;
    for (const socketId of userSockets ) {
        const socket = await allSockets.get(socketId);
        socket.leave(roomId.toString());
    }
}

module.exports = {initSocket, getIo, joinRoom, leaveRoom}

