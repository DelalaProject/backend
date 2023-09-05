const router = require("express").Router();

const {followController, unfollowController, getFollowingsController} = require("../controllers/followController");
const {verifyToken} = require("../middlewares/authMiddlewares");
const {checkUserExistance} = require("../middlewares/userMiddlewares");
const {checkFollowNonExistance} = require("../middlewares/followMiddlewares");

router.post(
    "/follow",
    [verifyToken,
    checkUserExistance,
    checkFollowNonExistance],
    followController
);

router.delete(
    "/unfollow",
    verifyToken,
    unfollowController
);

router.get(
    "/followings",
    verifyToken,
    getFollowingsController
)