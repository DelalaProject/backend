const router = require('express').Router();
const {signUpHandler} = require('../controllers/authController.js');
const {validateSignUpInfo} = require('../middlewares/authMiddlewares.js');


router.post(
    "/signup",
    //middlewares
    [validateSignUpInfo],
    signUpHandler,
    
);


module.exports = router;