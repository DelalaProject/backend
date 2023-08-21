const Listing = require('../models/listing');

const {createListing, getUserPublicListings} = require('../services/listingsService.js');

const createListingHandler = async (req, res) => {
    try {
        const listing = await createListing(req, res);
        res.status(200).json({ listing });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getUserPublicListingsHandler = async (req, res) => {
    try {
        const listings = await getUserPublicListings(req, res);
        res.status(200).json({ listings });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {createListingHandler, getUserPublicListingsHandler}