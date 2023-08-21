const User = require('../models/User');


const {signUp, signIn} = require('../services/authService.js');

const signUpHandler = async (req, res) => {
    try {
        const user = await signUp(req, res);
        res.status(201).json({ message: 'User ' + user.firstName +' created successfully', data: user});
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}

const signInHandler = async (req, res) => {
    try {
        const token = await signIn(req, res);
        res.status(200).json({ message: 'User signed in successfully', token, ...token._doc});
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}



module.exports = {signUpHandler, signInHandler}