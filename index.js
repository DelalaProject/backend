// IMPORTS FROM PACKAGES
const express = require("express");
const mongoose = require("mongoose");
const socket = require("socket.io");
const connectDB = require("./config/db_config.js");
const jsonBodyParser = require('body-parser').json();

const authRoute = require("./api/routes/authRoute.js");
const listingsRoute = require("./api/routes/listingsRoute.js");
const locationRoute = require("./api/routes/locationRoute.js");
const phoneNumberRoute = require("./api/routes/phoneNumberRoute.js");
const userRoute = require("./api/routes/userRoute.js");
const savedListingsRoute = require("./api/routes/savedListingsRoute.js");



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






//main route
app.use("/", (req, res) =>{
    const ipAdress = req.socket.remoteAddress;
    console.log("IT'S UP at : " + ipAdress );
    res.send({message: "Hello World!"});
});

const PORT = 3000;
const server =  app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));

console.log("Starting server...");
const io = socket(server);

const User = require("./api/models/User.js");
const Follow = require("./api/models/Follow.js");

io.on(
    "connection",
    (socket) => {

        let user;

        
        socket.on(
            "newConnection",
            async (data) => {
                
                await User.findById(data.userId).then(
                    (result) => {
                        user = result;
                    }
                );
                console.log(user);
                user.sockets.push(socket.id);
                await user.save();

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
                user.sockets = user.sockets.filter((socketId) => socketId != socket.id);
                await user.save();
                user = null;


            }
        );




    }
);



module.exports = {io};