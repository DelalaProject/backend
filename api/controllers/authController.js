const User = require('../models/User');


const {signUp} = require('../services/authService.js');

const signUpHandler = async (req, res) => {
    try {
        const user = await signUp(req, res);
        res.status(201).json({ message: 'User ' + user.firstName +' created successfully', data: user});
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}

module.exports = {signUpHandler}