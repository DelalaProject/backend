const Location = require("../models/Location");


const createLocation = async (req, res) => {
    const location = new Location({
        user: req.userId,
        title: req.body.title,
        address: req.body.address,
        coordinates : req.body.coordinates,
        
    });

    location.save();

    return location;
}

const getLocation = async (req, res) => {
    let location;

    await Location.findById(req.query.id).then((result) => {
        location = result;
    })

    return location;
}


const getLocations = async (req, res) => {
    let locations;
    await Location.find({user: req.query.userId}).then((results) => {
        locations = results;
    });

    return locations;
}

const deleteLocation = async (req, res) => {
    let deletedLocation;
    await Location.deleteOne({
        _id: req.query.id,
        user: req.userId,
    }).then((result) => {
        if (result.deletedCount === 0) {
            throw new Error("You don't have permission to delete this location");
        } else {
            deletedLocation = result;
        }
    });

    return deletedLocation;
}

const updateLocation = async (req, res) => {
    let updatedLocation;
    await Location.findOneAndUpdate({
        _id: req.query.id,
        user: req.userId,
    }, {
        title: req.body.title ? req.body.title : this.title,
        address: req.body.address ? req.body.address : this.address,
        coordinates: req.body.coordinates ? req.body.coordinates : this.coordinates,
    }).then((result) => {
        if (!result) {
            throw new Error("You don't have permission to update this location");
        } else {
            updatedLocation = result;
        }
    });

    return updatedLocation;
}



module.exports = {createLocation, getLocation, getLocations, deleteLocation, updateLocation};