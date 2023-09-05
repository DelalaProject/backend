const SavedListing = require('../models/SavedListing');

const saveListing = async (req, res) => {
    const savedListing = new SavedListing({
        listing: req.body.listingId,
        user: req.userId,
    });

    await savedListing.save();

    return savedListing

}

const getSavedListings = async (req, res) => {
    let savedListings; 
    await SavedListing.find({ 
        user: req.userId 
    }).populate('listing').then((listings) => {
        savedListings = listings;
    });

    return savedListings;

}

const unsaveListing = async (req, res) => {
    await SavedListing.deleteOne({
        _id: req.query.id,
        user: req.userId,
    });
}


module.exports = {saveListing, getSavedListings, unsaveListing};