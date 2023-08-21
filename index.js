// IMPORTS FROM PACKAGES
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db_config.js");
const jsonBodyParser = require('body-parser').json();

const authRoute = require("./api/routes/authRoute.js");
const listingsRoute = require("./api/routes/listingsRoute.js");



//INIT
const app = express();
app.use(jsonBodyParser);



//database connection
connectDB();

//routes
app.use('/auth', authRoute);
app.use('/listings', listingsRoute);

//main route
app.use("/", (req, res) =>{
    const ipAdress = req.socket.remoteAddress;
    console.log("IT'S UP at : " + ipAdress );
    res.send("Hello World!");
});





const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));