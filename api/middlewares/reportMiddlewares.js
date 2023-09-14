const {checkUserReportOwnership, checkListingReportOwnership} = require("../services/reportService");


const checkUserReportOwnershipMiddleware = async (req, res, next) => {
    try {
        await checkUserReportOwnership(req.userId, req.query.reportId);
        next();
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

const checkListingReportOwnershipMiddleware = async (req, res, next) => {
    try {
        await checkListingReportOwnership(req.userId, req.query.reportId);
        next();
    } catch (error) {
        return res.status(400).json({message: error.message});
    }
}

module.exports = {checkUserReportOwnershipMiddleware, checkListingReportOwnershipMiddleware};