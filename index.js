// IMPORTS FROM PACKAGES
const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db_config.js");
const jsonBodyParser = require('body-parser').json();

const authRoute = require("./api/routes/authRoute.js");



//INIT
const app = express();
app.use(jsonBodyParser);



//database connection
connectDB();

//routes
app.use('/auth', authRoute);

//main route
app.use("/", (req, res) =>{
    res.send("Hello World!");
});





const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));