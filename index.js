// IMPORTS FROM PACKAGES
const express = require("express");
const mongoose = require("mongoose");


//INIT
const app = express();
const DB = "mongodb+srv://backend:IHoE7yXq47Sudr7T@delalamaindb.fuygtgc.mongodb.net/";


//connections
mongoose.connect(DB).then(() => {
    console.log("Connection Successful");
}).catch((err) => console.log(err));