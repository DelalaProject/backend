const User = require('../models/User.js');


const bcrypt = require('bcrypt');
const config = require('../../config/auth_config.js');


const signUp = async (req, res) => {
    try {
        const user = new User({
            email: req.body.email,
            password: bcrypt.hash(req.body.password, config.saltRounds),
            phoneNumber: {
                number: req.body.phoneNumber.number,
                code: req.body.phoneNumber.code,
            },
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            addresses: req.body.addresses,
            rating: req.body.rating,
        });

        return user;

    } catch (err) {
        console.log(err);
    }
}


module.exports = {signUp}