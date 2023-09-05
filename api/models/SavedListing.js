const mongoose = require('mongoose');


const savedListingSchema = new mongoose.Schema({
    listing: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Listing",
        required: [true, "You can't create a saved listing without a listing"],
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: [true, "You can't create a saved listing without a user"],
    },

});

const SavedListing = mongoose.model("SavedListing", savedListingSchema);

module.exports = SavedListing;