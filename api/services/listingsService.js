
const Listing = require('../models/Listing');
const ListingReport = require('../models/ListingReport');
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
            date: Date.now(),
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

    const PAGE_SIZE = 10;
    let listings ;

    if (req.query.lat && req.query.lng && req.query.distance) {
        const nearAggregation = {
            $geoNear: {
              near: {
                type: 'Point',
                coordinates: [parseFloat(req.query.lat), parseFloat(req.query.lng)],
              },
              distanceField: 'distance',
              maxDistance: parseFloat(req.query.distance)*1000,
              spherical: true,
            },
          };
          
          const sortOptions = {
            $sort: {[req.query.sortBy] : parseFloat(req.query.sortOrder)}
          };
  
          const aggregatePipeline = [
              nearAggregation,
            {
              $match: req.searchQuery,
            },
            sortOptions,
            {
                $skip: (req.query.page ? req.query.page : 0)*10,
                
            },
            {
                $limit: PAGE_SIZE,
            },

            
          ];
        await Listing.aggregate(aggregatePipeline).then((results) => {
            listings = results;
        });
        
    } else {
        const sortOptions = {};
        if (req.query.sortBy) {
            sortOptions[req.query.sortBy] = parseFloat(req.query.sortOrder);
        }
        await Listing.find(req.searchQuery, null, {
            sort: sortOptions,
            skip: (req.query.page ? req.query.page : 0)*PAGE_SIZE,
            limit: PAGE_SIZE,
        }).then((results) => {
            listings = results;
        });
    }

    console.log(listings.length);

    return listings;



    
}

const reportListing = async (listingId, subject, reporterId) => {
    const report = new ListingReport({
        reported: listingId,
        reporter: reporterId,
        subject: subject,
    });
    await report.save();
    return report;
}

const getLisitingReports = async () => {
    let reportedListings;
    await ListingReport.find().populate("reported").then((results) => {
        reportedListings = results;
    });
    return reportedListings;
}

const deleteListingReport = async (reportId) => {
    await ListingReport.findByIdAndDelete(reportId);
}


const getUserListingReports = async (userId) => {
    let userReports;
    await ListingReport.find({
        reporter: userId,
    }).populate("reported").then((reports) => {
        userReports = reports;
    });
    return userReports;
}

const getUserListingReport = async (userId, reportedId) => {
    let userReports;
    await ListingReport.find({
        reported: reportedId,
        reporter: userId,
    }).populate("reported").then((reports) => {
        userReports = reports;
    });
    return userReports;
}




module.exports = {createListing, getUserPublicListings, getUserListings, deleteListing, updateListing, seacrhListings, reportListing, getLisitingReports, deleteListingReport, getUserListingReports, getUserListingReport}
