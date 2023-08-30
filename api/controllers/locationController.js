const {createLocation, getLocation, getLocations, deleteLocation, updateLocation} = require('../services/locationService');

const createLocationHandler = async (req, res) => {
    try {
        const location = await createLocation(req, res);
        return res.status(200).json(location);
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error.message});
    }
}

const getLocationHandler = async (req, res) => {
    try {
        const location = await getLocation(req, res);
        return res.status(200).json(location);
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error.message});
    }
}

const getLocationsHandler = async (req, res) => {
    try {
        const locations = await getLocations(req, res);
        return res.status(200).json(locations);
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error.message});
    }
}

const deleteLocationHandler = async (req, res) => {
    try {
        const deletedLocation = await deleteLocation(req, res);
        return res.status(200).json({message: "location deleted successfully", deletedLocation});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error.message});
    }
}

const updateLocationHandler = async (req, res) => {
    try {
        const updatedLocation = await updateLocation(req, res);
        return res.status(200).json({message: "location updated successfully", updatedLocation});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error.message});
    }
}

module.exports = {createLocationHandler, getLocationHandler, getLocationsHandler, deleteLocationHandler, updateLocationHandler};