const mongoose = require('mongoose');


const notificationSchema = new mongoose.Schema({
    title: {
        type: mongoose.SchemaTypes.String,
        required: [true, "You can't create a notification without a title"],
    },
    content: {
        type: mongoose.SchemaTypes.String,
        required: [true, "You can't create a notification without a content"],
    },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;