const User = require('../models/User.js');
const mongoose = require('mongoose');


const checkUserExistance = async (req, res, next) => {

    try {

        await User.findById(req.query.userId).then((user) => {
            
            if (user) next();
            else return res.status(400).json({ msg: "user not found" });
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({ msg: "an error has occured" });
        });
        

    } catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "an error has occured" });
    }
}


module.exports = {checkUserExistance}