const mongoose = require('mongoose');

const UserReportSchema = new mongoose.Schema({
    reported: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: [true, "You have to include the reported user"]
    },
    reporter: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: [true, "You have to include the reporter"]
    },
    subject: {
        type: mongoose.SchemaTypes.String,
        required: [true, "You have to include the subject"],
        enum: ["Spam", "Inappropriate", "Fake name", "Pretending to be someone", "Harassment", "Selling illegal things", "Other"]
    }

});

const UserReport = mongoose.model("UserReport", UserReportSchema);

module.exports = UserReport;