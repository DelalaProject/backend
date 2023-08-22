const router = require('express').Router();

const Listing = require('../models/listing');
const {verifyToken} = require('../middlewares/authMiddlewares.js');
const {createListingHandler, getUserPublicListingsHandler, getUserListingsHandler, deleteListingHandler, updateListingHandler} = require('../controllers/listingsController.js');
const {checkUserExistance} = require('../middlewares/userMiddlewares.js');
const {checkListingExistance, valideListingValues} = require('../middlewares/listingsMiddlewares.js');


router.post(
    "/create",
    verifyToken,
    createListingHandler
);

router.get(
    "/userPublicListings",
    checkUserExistance,
    getUserPublicListingsHandler

);

router.get(
    "/userListings",
    verifyToken,
    getUserListingsHandler
);

router.delete(
    "/delete",
    verifyToken,
    checkListingExistance,
    deleteListingHandler
);

router.put(
    "/update",
    verifyToken,
    [checkListingExistance, valideListingValues],
    updateListingHandler
);


module.exports = router;

