const mangoose = require('mongoose');

const recievedNotificationSchema = new mangoose.Schema({
    notification: {
        type: mangoose.SchemaTypes.ObjectId,
        ref: "Notification",
        required: [true, "You can't create a recieved notification without a notification"],
    },
    user: {
        type: mangoose.SchemaTypes.ObjectId,
        ref: "User",
        required: [true, "You can't create a recieved notification without a user"],
    },
    seen: {
        type: mangoose.SchemaTypes.Boolean,
        default: false,
    },

});