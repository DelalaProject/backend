const router = require('express').Router();

const {saveListingHandler, getSavedListingsHandler, unsaveListingHandler} = require('../controllers/savedListingsController');
const {verifyToken} = require('../middlewares/authMiddlewares');


router.post(
    "/save",
    verifyToken,
    saveListingHandler,
)

router.get(
    "/get",
    verifyToken,
    getSavedListingsHandler,
)

router.delete(
    "/unsave",
    verifyToken,
    unsaveListingHandler,
)


module.exports = router;

