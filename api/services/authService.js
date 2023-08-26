const User = require('../models/User.js');
const Location = require("../models/Location");


const bcrypt = require('bcrypt');
const config = require('../../config/auth_config.js');
const jwt = require('jsonwebtoken');


const signUp = async (req, res) => {

    
        const user = new User({
            email: req.body.email,
            password: (await bcrypt.hash(req.body.password, config.saltRounds)),
            phoneNumber: {
                number: req.body.phoneNumber.number,
                code: req.body.phoneNumber.code,
            },
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            rating: req.body.rating,
        });

        await user.save();

        
        const locations = [];
        for (i = 0; i < req.body.locations.length; i++) {

            const location = new Location({
                user: user._id,
                title: req.body.locations[i].title,
                address: req.body.locations[i].address,
                coordinates: {
                    coordinates : req.body.locations[i].coordinates,
                },
            });
            await location.save();
            locations.push(location._id);
        }


        user.locations = locations;
        await user.save();


        return user;

}

const signIn = async (req, res) => {
    
        const {email, password} = req.headers;
        let user;
        await User.findOne({email: email})
        .then((result) => {
            user = result;
        });
        
        if (!user) {
            throw new Error("User with this email does not exist!");
        }
        

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid credentials!");
        }

        const token  = jwt.sign({id: user._id}, config.jwtSecretKey);

        return token;

}


module.exports = {signUp, signIn}