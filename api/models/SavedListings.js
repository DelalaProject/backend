const mangoose = require('mangoose');


const savedListingSchema = new mangoose.Schema({
    listing: {
        type: mangoose.SchemaTypes.ObjectId,
        ref: "Listing",
        required: [true, "You can't create a saved listing without a listing"],
    },
    user: {
        type: mangoose.SchemaTypes.ObjectId,
        ref: "User",
        required: [true, "You can't create a saved listing without a user"],
    },

});