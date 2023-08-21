const router = require('express').Router();

const Listing = require('../models/listing');
const {verifyToken} = require('../middlewares/authMiddlewares.js');
const {createListingHandler, getUserPublicListingsHandler} = require('../controllers/listingsController.js');
const {checkUserExistance} = require('../middlewares/userMiddlewares.js');


router.post(
    "/create",
    verifyToken,
    createListingHandler
);

router.get(
    "/getUserPublicListings",
    checkUserExistance,
    getUserPublicListingsHandler

);


module.exports = router;

