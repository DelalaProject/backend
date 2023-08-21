const User = require('../models/User');
const Listing = require('../models/listing');
const mongoose = require('mongoose');

const createListing = async (req, res) => {
    try {
        const listing = new Listing({
            user: req.userId,
            title: req.body.title,
            description: req.body.description,
            type: req.body.type,
            category: req.body.category,
            subCategory: req.body.subCategory ,
            condition: req.body.condition,
            wholesaleOrRetail: req.body.wholesaleOrRetail,
            inStock: req.body.inStock,
            anonymous: req.body.anonymous,
            offerOrRequest: req.body.offerOrRequest,
            price: req.body.price,
            priceType: req.body.priceType,
            customSpecs: req.body.customSpecs,
            location: req.body.location,
        });


        await listing.save();

        return listing;

    } catch (err) {
        throw new Error(err.message);
    }
}

const getUserPublicListings = async (req, res) => {
    try {
        
        let listings = [];
        await Listing.find({user:req.headers["userid"]}).then((results) => {
            listings = results;
        }).catch((err) => {
            throw new Error(err.message);
        });;

        return listings;

    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {createListing, getUserPublicListings}
