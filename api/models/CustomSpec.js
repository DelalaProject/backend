const mongoose = require('mongoose');


const customSpecSchema = new mongoose.Schema({
    name: {
        type: mongoose.SchemaTypes.String,
        required: [true, "You can't create a custom spec without a name"],
    },
    listing: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Listing",
        required: [true, "You can't create a custom spec without a listing"],
    },
    value: {
        type: mongoose.SchemaTypes.String,
        required: [true, "You can't create a custom spec without a value"],
    },

});