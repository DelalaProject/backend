const UserReport = require("../models/UserReport");
const ListingReport = require("../models/ListingReport");


const checkUserReportOwnership = async (userId, reportId) => {
    await UserReport.findOne({
        _id: reportId,
        reporter: userId,
    }).then((result) => {
        if (!result) {
            throw new Error("You don't have permission to use this report");
        }
    });
}

const checkListingReportOwnership = async (userId, reportId) => {
    await UserReport.findOne({
        _id: reportId,
        reporter: userId,
    }).then((result) => {
        if (!result) {
            throw new Error("You don't have permission to use this report");
        }
    });
}

module.exports = {checkUserReportOwnership, checkListingReportOwnership};