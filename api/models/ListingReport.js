const mongoose = require('mongoose');

const ListingReportSchema = new mongoose.Schema({
    reported: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Listing",
        required: [true, "You have to include the reported listing"]
    },
    reporter: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: [true, "You have to include the reporter"]
    },
    subject: {
        type: mongoose.SchemaTypes.String,
        required: [true, "You have to include the subject"],
        enum: ["Spam", "Inappropriate", "Illegal", "Other"]
    }

});

const ListingReport = mongoose.model("ListingReport", ListingReportSchema);

module.exports = ListingReport;