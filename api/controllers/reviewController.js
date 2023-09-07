const {createReview, modifyReview, deleteReview} = require('../services/reviewService');

const createReviewHandler = async (req, res) => {
    try {
        const review = await createReview(req, res);
        res.status(200).send({review, message: "Review created successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
}

const modifyReviewHandler = async (req, res) => {
    try {
        const review = await modifyReview(req, res);
        res.status(200).send({review, message: "Review modified successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
}

const deleteReviewHandler = async (req, res) => {
    try {
        const review = await deleteReview(req, res);
        res.status(200).send({review, message: "Review deleted successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
}


module.exports = {createReviewHandler, modifyReviewHandler, deleteReviewHandler}