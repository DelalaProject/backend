const mangoose = require('mangoose');


const reviewSchema = new mangoose.Schema({
    reviewer: {
        type: mangoose.SchemaTypes.ObjectId,
        ref: "User",
        required: [true, "You can't create a review without a reviewer"],
    },
    reviewed: {
        type: mangoose.SchemaTypes.ObjectId,
        ref: "User",
        required: [true, "You can't create a review without a reviewed"],
    },
    rating: {
        type: mangoose.SchemaTypes.Number,
        required: [true, "You can't create a review without a rating"],
        min: 1,
        max: 5,
    },
    comment: {
        type: mangoose.SchemaTypes.String,
    },
    date: {
        type: mangoose.SchemaTypes.Date,
        default: Date.now(),
    }

});