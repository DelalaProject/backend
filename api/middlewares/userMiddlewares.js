const User = require('../models/User.js');
const bcrypt =  require('bcrypt');


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


const checkUserEmailExistance = async (req, res, next) => {
    try {
        await User.findOne({email: req.body.email}).then((user) => {
            if (user) return res.status(400).json({ msg: "user with this email already exists" });
            else next();
        }).catch((err) => {
            console.log(err);
            return res.status(400).json({ msg: "an error has occured" });
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "an error has occured" });
    }
}


const checkPasswordMatch = async (req, res, next) => {
    
        try {
            let user;
            await User.findById(req.userId).then((result) => {
                user = result;
                
                if (!user) return res.status(400).json({ msg: "user not found" });
            }).catch((err) => {
                console.log(err);
                return res.status(400).json({ msg: "an error has occured" });
            });

            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (isMatch) next();
            else return res.status(400).json({ msg: "wrong password" });
            
    
        } catch (err) {
            console.log(err);
            return res.status(400).json({ msg: "an error has occured" });
        }
}

module.exports = {checkUserExistance, checkPasswordMatch, checkUserEmailExistance}