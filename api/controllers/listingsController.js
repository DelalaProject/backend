const Listing = require('../models/Listing');

const {createListing, getUserPublicListings, getUserListings, deleteListing, updateListing, seacrhListings, reportListing, getLisitingReports, deleteListingReport, getUserListingReports, getUserListingReport}= require('../services/listingsService.js');

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

const reportListingHandler = async (req, res) => {
    try {
        const report = await reportListing(req.body.listingId, req.body.subject, req.userId);
        res.status(200).json({ report });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}


const getLisitingReportsHandler = async (req, res) => {
    try {
        const listings = await getLisitingReports();
        res.status(200).json({ listings });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}

const deleteListingReportHandler = async (req, res) => {
    try {
        await deleteListingReport(req.body.reportId);
        res.status(200).json({ message: "report deleted successfully"});
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}

const getUserListingReportsHandler = async (req, res) => {
    try {
        const reports = await getUserListingReports(req.userId);
        res.status(200).json({ reports });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}

const getUserListingReportHandler = async (req, res) => {
    try {
        const reports = await getUserListingReport(req.userId, req.body.reportedId);
        res.status(200).json({ reports });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
}



module.exports = {createListingHandler, getUserPublicListingsHandler, getUserListingsHandler, deleteListingHandler, updateListingHandler, seacrhListingsHandler, reportListingHandler, getLisitingReportsHandler, deleteListingReportHandler, getUserListingReportsHandler, getUserListingReportHandler}