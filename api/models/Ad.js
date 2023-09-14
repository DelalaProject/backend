const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: [true, "Listing is required to create an ad"],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required to create an ad"],
    },
    views: {
        type: mongoose.Schema.Types.Number,
        default: 0,
    },
    enabled: {
        type: mongoose.Schema.Types.Boolean,
        default: true,
    }
})

const Ad = mongoose.model("Ad", listingSchema);

module.exports = Ad;