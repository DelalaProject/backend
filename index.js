// IMPORTS FROM PACKAGES

const process = require("process");
const express = require("express");
const mongoose = require("mongoose");
const {initSocket} = require("./api/services/socketIoService.js");
const connectDB = require("./config/db_config.js");
const jsonBodyParser = require('body-parser').json();


const User = require("./api/models/User.js");

const authRoute = require("./api/routes/authRoute.js");
const listingsRoute = require("./api/routes/listingsRoute.js");
const locationRoute = require("./api/routes/locationRoute.js");
const phoneNumberRoute = require("./api/routes/phoneNumberRoute.js");
const userRoute = require("./api/routes/userRoute.js");
const savedListingsRoute = require("./api/routes/savedListingsRoute.js");
const conversationsRoute = require("./api/routes/conversationRoute.js");
const reviewRoute = require("./api/routes/reviewRoute.js");
const notificationRoute = require("./api/routes/notificationRoute.js");
const adRouter = require("./api/routes/adRoute.js");



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
app.use('/reviews', reviewRoute);
app.use('/notifications', notificationRoute);
app.use('/ads', adRouter);







const PORT = 3000;
const server =  app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));

console.log("Starting server...");
const io = initSocket(server);




//main route
const ConversationMembership = require("./api/models/conversationMembership.js");
const {sendMessage} = require("./api/services/conversationService.js");
app.use("/", async (req, res) =>{
    const ipAdress = req.socket.remoteAddress;
    console.log("IT'S UP at : " + ipAdress );
    
    let i = 0;
    const intervalId = setInterval(async () => {

        try {
            await ConversationMembership.findOne({
                conversation: req.body.conversationId,
                user: req.body.id,
            }).then(
                (result) => {
                    if (result == false) throw new Error({message: "You are not a member of this conversation"});
                }
            );
            
            await sendMessage("new message number "+i, req.body.conversationId, req.body.id, io);
            
        } catch (error) {
            console.log(error);
            res.status(500).send({message: error.message});
        }
        console.log("sending message "+ i);
        if (i==23) {
            clearInterval(intervalId);
            res.send({message: "Hello World!"});
        }
        i++;
    }, 5000);
    // res.send({message: "Hello World!"});

});

