


const emailValidator = (email, res) => {
    var errorMessage;
    if (!email) {
        errorMessage = "Email is required";
        res.status(400).json({ message: errorMessage });
        throw new Error(errorMessage);
    } else if (email.toString().includes("@") === false || email.toString().includes(".") === false) {
        errorMessage = "Email must be valid";
        res.status(400).json({ message: errorMessage});
        throw new Error(errorMessage);
    }
}

const passwordValidator = (password, res) => {
    var errorMessage;
    const testPassword = (regex) => {
        return regex.test(password);
    }
    if (!password) {
        //testing if password is empty
        errorMessage = "Password is required";
        res.status(400).json({ message:  errorMessage });
        throw new Error(errorMessage);
    } else if (!testPassword(/^.{8,}$/)) {
        //testing if password is at least 8 characters long
        errorMessage = "Password must at least contain 8 characters";
        res.status(400).json({message: errorMessage});
        throw new Error(errorMessage);
    } else if (!testPassword(/^(?=.*[a-z]).{8,}$/)) {
        //testing if password contains at least one lowercase letter
        errorMessage = "Password must contain at least one lowercase letter";
        res.status(400).json({message: errorMessage});
        throw new Error(errorMessage);
    } else if (!testPassword(/^(?=.*[A-Z]).{8,}$/)) {
        //testing if password contains at least one uppercase letter
        errorMessage = "Password must contain at least one uppercase letter";
        res.status(400).json({message: errorMessage});
        throw new Error(errorMessage);
    }  else if (!testPassword(/^(?=.*\d).{8,}$/)) {
        //testing if password contains at least one numerical character
        errorMessage = "Password must contain at least one numerical character";
        res.status(400).json({message: errorMessage});
        throw new Error(errorMessage);
    } else if (!testPassword(/^(?=.*[@$!%*?&]).{8,}$/)) {
        //testing if password contains at least one special character
        errorMessage = "Password must contain at least one od these special characters: @, $, !, %, *, ?, &";
        res.status(400).json({message: errorMessage});
        throw new Error(errorMessage);
    } else if (!testPassword(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
        //testing if password contains other characters than the ones specified above
        errorMessage = "Password must not contain other characters than the ones specified: alphabetic, numeric, special characters: @, $, !, %, *, ?, &";
        res.status(400).json({message: errorMessage});
        throw new Error(errorMessage);
    }
}

module.exports = {emailValidator, passwordValidator}