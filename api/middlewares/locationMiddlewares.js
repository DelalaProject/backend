

const Location = require("../models/Location");

const verifyLocationInfo = async (req, res, next) => {
    if (!req.body.title) {
        return res.status(400).json({ message: "title is required" });
    } else if (!req.body.address) {
        return res.status(400).json({ message: "address is required" });
    } else if (!req.body.coordinates) {
        return res.status(400).json({ message: "coordinates is required" });
    } else {
        next();
    }
}

const checkLocationExistance = async (req, res, next) => {
    try {
        await Location.findById(req.query.id).then((location) => {
            if (!location) {
                return res.status(400).json({ message: "location not found" });
            } else {
                next();
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "an error has occured" });
    }
}

module.exports = { checkLocationExistance, verifyLocationInfo };