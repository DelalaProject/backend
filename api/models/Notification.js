const mangoose = require('mangoose');


const notificationSchema = new mangoose.Schema({
    title: {
        type: mangoose.SchemaTypes.String,
        required: [true, "You can't create a notification without a title"],
    },
    content: {
        type: mangoose.SchemaTypes.String,
        required: [true, "You can't create a notification without a content"],
    },
});