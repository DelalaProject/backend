const Review = require('../models/Review');
const User = require('../models/User');


const createReview = async (req, res) => {

    const review = new Review({
        reviewer: req.userId,
        reviewed: req.body.reviewedId,
        rating: req.body.rating,
    });

    await review.save();

    await User.findById(req.body.reviewedId).then(
        async (result) => {
            await Review.countDocuments({reviewed: req.body.reviewedId}).then(
                async (count) => {
                    result.rating = (result.rating * (count - 1) + req.body.rating) / count;
                    await result.save();
                }
            )
        }
    );

    return review;
}

const modifyReview = async (req, res) => {


    const review = await Review.findAndModify({
        reviewer: req.userId,
        reviewed: req.body.reviewedId,
    },
    {
        rating: req.body.rating,
    },
    {
        returnOriginal: true,
    }).then(
        async (oldRating) => {
            await User.findById(req.body.reviewedId).then(
                async (result) => {
                    await Review.countDocuments({reviewed: req.body.reviewedId}).then(
                        async (count) => {
                            result.rating = (result.rating - oldRating.rating + req.body.rating) / count;
                            await result.save();
                        }
                    )
                }
            );
        }
    );

   return review;

}

const deleteReview = async (req, res) => {

    await Review.findOneAndDelete({
        reviewer: req.userId,
        reviewed: req.body.reviewedId,
    }).then(
        async (deletedRating) => {
            await User.findById(req.body.reviewedId).then(
                async (result) => {
                    await Review.countDocuments({reviewed: req.body.reviewedId}).then(
                        async (count) => {
                            if (count) {
                                result.rating = (result.rating * (count + 1) - deletedRating.rating) / count;
                            } else {
                                result.rating = 0;
                            }
                            
                            await result.save();
                        }
                    )
                }
            );
        }
    );
}


module.exports = {createReview, modifyReview, deleteReview}