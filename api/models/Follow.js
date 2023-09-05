const mongoose = require('mongoose');


const followSchema = new mongoose.Schema({
    follower: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, "Follower is required"],
        ref: "User",
    },
    followed: {
        type: mongoose.SchemaTypes.ObjectId,
        required: [true, "Followed is required"],
        ref: "User",
    }
})


const Follow = mongoose.model("Follow", followSchema);

module.exports = Follow;