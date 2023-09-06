const router = require('express').Router();
const {signUpHandler, signInHandler} = require('../controllers/authController.js');
const {validateSignUpInfo, validateSignInInfo} = require('../middlewares/authMiddlewares.js');
const {checkUserEmailExistance} = require('../middlewares/userMiddlewares.js');


router.post(
    "/signup",
    //middlewares
    [validateSignUpInfo,
    checkUserEmailExistance],
    signUpHandler,
    
);
router.get(
    "/signin",
    //middlewares
    [validateSignInInfo],
    signInHandler,
    
);


module.exports = router;