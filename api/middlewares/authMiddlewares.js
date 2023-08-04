
const {emailValidator, passwordValidator} = require("../tools/inputValidators.js");


const validateSignUpInfo = (req, res, next) => {
    const body = req.body;

    
    try{ 
        //check if email is valid
        emailValidator(body.email, res);

        //check if password is valid
        passwordValidator(body.password, res);
    } catch (err) {
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

module.exports = {validateSignUpInfo}