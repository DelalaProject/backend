const mongoose = require('mongoose');

const recievedNotificationSchema = new mongoose.Schema({
    notification: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Notification",
        required: [true, "You can't create a recieved notification without a notification"],
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: [true, "You can't create a recieved notification without a user"],
    },
    seen: {
        type: mongoose.SchemaTypes.Boolean,
        default: false,
    },
    date: {
        type: mongoose.SchemaTypes.Date,
        default: Date.now,
    }
    

});

const RecievedNotification = mongoose.model("RecievedNotification", recievedNotificationSchema);

module.exports = RecievedNotification;
