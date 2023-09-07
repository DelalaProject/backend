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






//main route
app.use("/", (req, res) =>{
    const ipAdress = req.socket.remoteAddress;
    console.log("IT'S UP at : " + ipAdress );
    res.send({message: "Hello World!"});

});

const PORT = 3000;
const server =  app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));

console.log("Starting server...");
initSocket(server);




