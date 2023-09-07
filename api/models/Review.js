const mongoose = require('mongoose');


const reviewSchema = new mongoose.Schema({
    reviewer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: [true, "You can't create a review without a reviewer"],
    },
    reviewed: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: [true, "You can't create a review without a reviewed"],
    },
    rating: {
        type: mongoose.SchemaTypes.Number,
        required: [true, "You can't create a review without a rating"],
        min: 0,
        max: 5,
    },
    date: {
        type: mongoose.SchemaTypes.Date,
        default: Date.now(),
    }

});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;