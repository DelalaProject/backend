const Router = require('express').Router();
const {createReviewHandler, modifyReviewHandler, deleteReviewHandler} = require('../controllers/reviewController');
const {verifyToken} = require('../middlewares/authMiddlewares');
const {checkReviewExistance, checkReviewNonExistance} = require('../middlewares/reviewMiddlewares');

Router.post(
    '/createReview',
    [
        verifyToken,
        checkReviewNonExistance,
    ],
    createReviewHandler,
)

Router.put(
    '/modifyReview',
    [
        verifyToken,
        checkReviewExistance,
    ],
    modifyReviewHandler,
)

Router.delete(
    '/deleteReview',
    [
        verifyToken,
        checkReviewExistance,
    ],
    deleteReviewHandler,
)

module.exports = Router;