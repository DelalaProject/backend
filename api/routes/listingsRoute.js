const router = require('express').Router();

const {verifyToken} = require('../middlewares/authMiddlewares.js');
const {checkUserExistance} = require('../middlewares/userMiddlewares.js');
const {checkListingExistance, valideListingValues, searchQueryBuilder} = require('../middlewares/listingsMiddlewares.js');
const {createListingHandler, getUserPublicListingsHandler, getUserListingsHandler, deleteListingHandler, updateListingHandler, seacrhListingsHandler} = require('../controllers/listingsController.js');


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

router.get(
    "/searchAsGuest",
    searchQueryBuilder,
    seacrhListingsHandler
);


module.exports = router;

