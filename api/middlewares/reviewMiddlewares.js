const Review = require("../models/Review");

const checkReviewExistance = async (req, res, next) => {
    try {
        await Review.findOne({
            reviewer: req.userId,
            reviewed: req.body.reviewedId,
        }).then(
            (result) => {
                if (result) next();
                else res.status(403).send({message: "This review does not exist"});
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
}

const checkReviewNonExistance = async (req, res, next) => {
    try {
        await Review.findOne({
            reviewer: req.userId,
            reviewed: req.body.reviewedId,
        }).then(
            (result) => {
                if (result) res.status(403).send({message: "You have already reviewed this user"});
                else next();
            }
        );
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
}


module.exports = {checkReviewExistance, checkReviewNonExistance}