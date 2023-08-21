const User = require('../models/User.js');


const bcrypt = require('bcrypt');
const config = require('../../config/auth_config.js');
const jwt = require('jsonwebtoken');


const signUp = async (req, res) => {
    try {
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

    } catch (err) {
        throw new Error(err.message);
    }
}

const signIn = async (req, res) => {
    try {
        const {email, password} = req.headers;
        const user =await User.findOne({email: email});
        if (!user) {
        return res
          .status(400)
          .json({ msg: "User with this email does not exist!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials!" });
        }

        const token  = jwt.sign({id: user._id}, config.jwtSecretKey);

        return token;

    } catch (err) {
        throw new Error(err.message);
    }
}


module.exports = {signUp, signIn}