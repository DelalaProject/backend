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
    coordinates: {
        type: {
            type: mongoose.SchemaTypes.String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [mongoose.SchemaTypes.Number],
            required: true
        }
    },

});

locationSchema.index({ coordinates: '3dsphere' });

const Location = mongoose.model("Location", locationSchema);


module.exports = Location;