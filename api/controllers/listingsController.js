const Listing = require('../models/Listing');

const {createListing, getUserPublicListings, getUserListings, deleteListing, updateListing, seacrhListings} = require('../services/listingsService.js');

const createListingHandler = async (req, res) => {
    try {
        const listing = await createListing(req, res);
        res.status(200).json({ "listing" : listing, message : "Listing created successfuly" });
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

const getUserListingsHandler = async (req, res) => {
    try {
        const listings = await getUserListings(req, res);
        res.status(200).json({ listings });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const deleteListingHandler = async (req, res) => {
    try {
        const listing = await deleteListing(req, res);
        res.status(200).json({ deleted_isting: listing, message: "Listing deleted successfuly"});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const updateListingHandler = async (req, res) => {
    try {
        const listing = await updateListing(req, res);
        res.status(200).json({ updated_isting: listing, message: "Listing updated successfuly"});
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}

const seacrhListingsHandler = async (req, res) => {
    try {
        const listings = await seacrhListings(req, res);
        res.status(200).json({ listings });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}



module.exports = {createListingHandler, getUserPublicListingsHandler, getUserListingsHandler, deleteListingHandler, updateListingHandler, seacrhListingsHandler}