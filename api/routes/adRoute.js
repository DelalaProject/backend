const router = require("express").Router();

const { verifyToken } = require("../middlewares/authMiddlewares.js");
const {createAdHandler, getAdHandler, deleteAdHandler, modifyAdStateHandler, getUserAdsHandler, getAdsHandler} = require("../controllers/adController.js");
const {checkAdExistanceMiddleware, checkAdExistanceAndOwnershipMiddleware} = require("../middlewares/adMiddlewares.js");


router.post(
    "/create",
    verifyToken,
    createAdHandler
)

router.get(
    "/get",
    [
        verifyToken,
        checkAdExistanceAndOwnershipMiddleware,
    ],
    getAdHandler
)

router.delete(
    "/delete",
    [
        verifyToken,
        checkAdExistanceAndOwnershipMiddleware,
    ],
    deleteAdHandler
)

router.put(
    "/modifyState",
    [
        verifyToken,
        checkAdExistanceAndOwnershipMiddleware,
    ],
    modifyAdStateHandler
)

router.get(
    "/getUserAds",
    verifyToken,
    getUserAdsHandler
)

router.get(
    "/getAds",
    getAdsHandler
)

module.exports = router;