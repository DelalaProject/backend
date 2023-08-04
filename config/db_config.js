const DB = "mongodb+srv://backend:IHoE7yXq47Sudr7T@delalamaindb.fuygtgc.mongodb.net/";
const mongoose = require("mongoose");


const connectDB = () =>{ mongoose.connect(DB).then(() => {
    console.log("Database connection Successful");
}).catch((err) => console.log(err));
}

module.exports = connectDB;