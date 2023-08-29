const mongoose = require('mongoose');




const locationSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: [true, "You can't add a location without a user"],
    },
    title: {
        type: mongoose.SchemaTypes.String,
        required: [true, "Title is required"],

    },
    address: {
        type: mongoose.SchemaTypes.String,
        required: [true, "Address is required"],
    },
    coordinates:  {
        type: [mongoose.SchemaTypes.Number],
        index: '2dsphere',
        required: true
    }
    

});

// locationSchema.index({ coordinates: '2dsphere' });

const Location = mongoose.model("Location", locationSchema);


module.exports = Location;