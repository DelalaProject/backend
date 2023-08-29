
const Listing = require('../models/Listing');
const Location = require('../models/Location');
const {getDistanceFromLatLonInKm} = require('../tools/calculations.js');


const createListing = async (req, res) => {
        
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

        await Location.findById(req.body.location).then((location) => {
            if (!location) {
                throw new Error("Location not found");
            } else if (location.user != req.userId) {
                throw new Error("You don't have permission to use this location");
            } else {
                listing.coordinates = location.coordinates;
            }
            
        });


        await listing.save();

        return listing;

}

const getUserPublicListings = async (req, res) => {

        
        let listings = [];
        await Listing.find({
            user:req.query.userId,
            anonymous:false
        }).then((results) => {
            listings = results;
        }).catch((err) => {
            throw new Error(err.message);
        });;

        return listings;

}


const getUserListings = async (req, res) => {
    
        
        let listings = [];
        await Listing.find({
            user:req.userId,
        }).then((results) => {
            listings = results;
        }).catch((err) => {
            throw new Error(err.message);
        });;

        return listings;

}

const deleteListing = async (req, res) => {
        
    const listing = await Listing.findOneAndDelete({
        _id: req.query.listingId,
        user: req.userId,
    }).then((result) => {
        if (!result) {
            throw new Error("You don't have permission to delete this listing");
        }
    });
    return listing;
}


const updateListing = async (req, res) => {
    let listing;
    await Listing.findOneAndUpdate({
        _id: req.query.listingId,
        user: req.userId,
    }, {
        title : req.body.title ? req.body.title : this.title,
        description : req.body.description ? req.body.description : this.description,
        type : req.body.type ? req.body.type : this.type,
        dateModified : Date.now(),
        category : req.body.category ? req.body.category : this.category,
        subCategory : req.body.subCategory ? req.body.subCategory : this.subCategory,
        condition : req.body.condition ? req.body.condition : this.condition,
        wholesaleOrRetail : req.body.wholesaleOrRetail ? req.body.wholesaleOrRetail : this.wholesaleOrRetail,
        inStock : req.body.inStock ? req.body.inStock : this.inStock,
        anonymous : req.body.anonymous ? req.body.anonymous : this.anonymous,
        offerOrRequest : req.body.offerOrRequest ? req.body.offerOrRequest : this.offerOrRequest,
        price : req.body.price ? req.body.price : this.price,
        priceType : req.body.priceType ? req.body.priceType : this.priceType,
        customSpecs : req.body.customSpecs ? req.body.customSpecs : this.customSpecs,
        location : req.body.location ? req.body.location : this.location,
    }, {
        new: true,
    }).then((result) => {
        
        if (!result){
            throw new Error("You don't have permission to delete this listing");
        }
        listing = result;
    });
    return listing;
}


const seacrhListings = async (req, res) => {

    
    let listings ;

    if (req.query.lat && req.query.lng && req.query.distance) {
        await Listing.aggregate(req.searchQuery).then((results) => {
            listings = results;
        });
        
    } else {
        await Listing.find(req.searchQuery).then((results) => {
            listings = results;
        });
    }

    return listings;


    await Listing.find(req.searchQuery).then((results) => {
        
        listings = results;
    });

    let distance, searchLatitude, searchLongitude;
    for (let i = 0; i < listings.length; i++) {
        await Location.findById(listings[i].location).then((location) => {
            distance = getDistanceFromLatLonInKm(req.query.lat, req.query.lng, location.coordinates[0], location.coordinates[1]);
            if (distance > req.query.distance) {
                listings.slice(i, 1);
            } else {
                if (listings.anonymous) delete location.user;
                location.distance = distance;
                console.log(location);
                listings[i].location = location;
            }

        });
    }


    

    return listings;
    
}

module.exports = {createListing, getUserPublicListings, getUserListings, deleteListing, updateListing, seacrhListings}
