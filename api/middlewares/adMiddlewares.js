const checkAdExistanceAndOwnership = require("../services/adServices").checkAdExistanceAndOwnership;


const checkAdExistanceMiddleware = async (req, res, next) => {
    try {
        await checkAdExistanceAndOwnership(req.body.listingId);
        next();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const checkAdExistanceAndOwnershipMiddleware = async (req, res, next) => {
    try {
        await checkAdExistanceAndOwnership(req.body.listingId, req.userId);
        next();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


module.exports = {checkAdExistanceMiddleware, checkAdExistanceAndOwnershipMiddleware}