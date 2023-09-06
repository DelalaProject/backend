// IMPORTS FROM PACKAGES
const nodemon = require('nodemon');
const process = require("process");
const express = require("express");
const mongoose = require("mongoose");
const {initSocket} = require("./api/services/socketIoService.js");
const connectDB = require("./config/db_config.js");
const jsonBodyParser = require('body-parser').json();

const authRoute = require("./api/routes/authRoute.js");
const listingsRoute = require("./api/routes/listingsRoute.js");
const locationRoute = require("./api/routes/locationRoute.js");
const phoneNumberRoute = require("./api/routes/phoneNumberRoute.js");
const userRoute = require("./api/routes/userRoute.js");
const savedListingsRoute = require("./api/routes/savedListingsRoute.js");
const conversationsRoute = require("./api/routes/conversationRoute.js");



//INIT
const app = express();
app.use(jsonBodyParser);



//database connection
connectDB();

//routes
app.use('/auth', authRoute);
app.use('/listings', listingsRoute);
app.use('/location', locationRoute);
app.use('/phoneNumber', phoneNumberRoute);
app.use('/user', userRoute);
app.use('/savedListings', savedListingsRoute);
app.use('/conversations', conversationsRoute);






//main route
app.use("/", (req, res) =>{
    const ipAdress = req.socket.remoteAddress;
    console.log("IT'S UP at : " + ipAdress );
    res.send({message: "Hello World!"});

});

const PORT = 3000;
const server =  app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));

console.log("Starting server...");
const io = initSocket(server);

const User = require("./api/models/User.js");
const Follow = require("./api/models/Follow.js");

io.on(
    "connection",
    (socket) => {

        let userId;

        
        socket.on(
            "newConnection",
            async (data) => {
                
                userId = data.userId;
                await User.findById(data.userId).then(
                    async (result) => {
                        result.sockets.push(socket.id);
                        
                        await result.save();
                    }
                );

                socket.join(data.userId.toString());

                await Follow.find({follower: data.userId}).then(
                    (result) => {
                        result.forEach(
                            (follow) => {
                                socket.join(follow.followed.toString());
                            }
                        );
                    }
                );
            }
        )
        socket.on(
            "disconnect",
            async () => {
                
                await User.findById(userId).then(
                    async (result) => {
                        
                        result.sockets = result.sockets.filter((socketId) => socketId != socket.id);
                        console.log(result);
                        await result.save();

                    }
                );



            }
        );




    }
);

process.on('uncaughtException', (error) => {
    User.updateMany({}, {sockets: []}).then();
    throw error;
  });


module.exports = server;