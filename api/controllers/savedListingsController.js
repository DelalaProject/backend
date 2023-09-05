const {saveListing, getSavedListings, unsaveListing} = require('../services/savedListingsService');

const saveListingHandler = async (req, res) => {
    try {
        const savedListing = await saveListing(req, res);
        return res.status(200).json({message: "listing saved successfully", savedListing});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error.message});
    }
}

const getSavedListingsHandler = async (req, res) => {
    try {
        const savedListings = await getSavedListings(req, res);
        return res.status(200).json(savedListings);
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error.message});
    }
}

const unsaveListingHandler = async (req, res) => {
    try {
        await unsaveListing(req, res);
        return res.status(200).json({message: "listing unsaved successfully"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error.message});
    }
}

module.exports = {saveListingHandler, getSavedListingsHandler, unsaveListingHandler};