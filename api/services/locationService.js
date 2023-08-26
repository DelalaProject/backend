const Location = require("../models/Location");


const createLocation = async (req, res) => {
    const location = new Location({
        user: req.userId,
        title: req.body.title,
        address: req.body.address,
        coordinates: {
            coordinates : req.body.coordinates,
        }
    });

    location.save();

    return location;
}


module.exports = {createLocation};