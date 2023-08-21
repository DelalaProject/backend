const router = require('express').Router();
const {signUpHandler, signInHandler} = require('../controllers/authController.js');
const {validateSignUpInfo, validateSignInInfo} = require('../middlewares/authMiddlewares.js');


router.post(
    "/signup",
    //middlewares
    [validateSignUpInfo],
    signUpHandler,
    
);
router.get(
    "/signin",
    //middlewares
    [validateSignInInfo],
    signInHandler,
    
);


module.exports = router;