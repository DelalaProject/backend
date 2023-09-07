const socketIo = require('socket.io');
const Follow = require('../models/Follow.js');
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
    "connection",
    (socket) => {
        

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
                    
                    await checkConversationMembership(data.conversationId, socket.decoded_token.id);
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

module.exports = {initSocket, getIo}

