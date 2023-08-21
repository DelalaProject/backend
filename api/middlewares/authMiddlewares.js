
const {emailValidator, passwordValidator} = require("../tools/inputValidators.js");
const jwt = require('jsonwebtoken');
const config = require('../../config/auth_config.js');

const validateSignUpInfo = (req, res, next) => {
    const body = req.body;

    
    try{ 
        //check if email is valid
        emailValidator(body.email);

        //check if password is valid
        passwordValidator(body.password);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
        return;
    }

    

    //check if password is valid
    // const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // if (!body.password) {
    //     return res.status(400).json({ message: "Password is required" });
    // }
    // else if (!regex.test(body.password)) {
    //     return res.status(400).json({ message: "Password invalid" });
    // }

    //check if phone number is valid
    // if (!body.phoneNumber) {
    //     return res.status(400).json({ message: "Phone number is required" });
    // } else if (!body.phoneNumber.number) {
    //     return res.status(400).json({ message: "Phone number is required" });
    // } else if (!body.phoneNumber.code) {
    //     return res.status(400).json({ message: "Country code is required" });
    // }


    next();
}
const validateSignInInfo = (req, res, next) => {

    
    try{ 
        //check if email is valid
        emailValidator(req.headers.email);

    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
        return;
    }

    



    next();
}


const verifyToken = async (req, res, next) => {
    const token = req.headers["x-access-token"];

    try {
        if (!token) {
            return res.status(403).json({ message: "No token provided" });
        }

        jwt.verify(token, config.jwtSecretKey, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            req.userId = decoded.id;
            next();
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
        return;
    }
}

module.exports = {validateSignUpInfo, verifyToken, validateSignInInfo}