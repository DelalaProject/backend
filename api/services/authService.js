const User = require('../models/User.js');


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
            addresses: req.body.addresses,
            rating: req.body.rating,
        });

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