const Ad = require("../models/Ad");


const createAd = async (listingId, userId) => {
    const ad = new Ad({
        listing: listingId,
        user: userId,
    });
    await ad.save();
    return ad;
}

const getAd = async (listingId) => {
    let ad; 
    await Ad.findOne({ listing: listingId }).then((result) => {
        ad= result;
    });
    return ad;
}

const deleteAd = async (listingId) => {
    let ad;
    await Ad.findOneAndDelete({ listing: listingId }).then((result) => {
        ad = result;
    });
    return ad;
}

const modifyAdState = async (listingId, state) => {
    await Ad.findOneAndUpdate({ listing: listingId }, { enabled: state });
}

const getUserAds = async (userId) => {
    let ads;
    await Ad.find({ user: userId }).then((result) => {
        ads = result;
    });
    return ads;
}

const getAds = async () => {
    const ADS_TO_SHOW = 5;
    let ads;
    await Ad.find({}, null, 
        {
            sort: {views: 1},
            limit: ADS_TO_SHOW,
        }).then((results) => {
        ads = results;
        results.forEach(async (ad) => {
            ad.views++;
            ad.save();
        });
    });
    return ads;
}

const checkAdExistanceAndOwnership = async (listingId, userId) => {
    await Ad.findOne({ listing: listingId}).then((result) => {
        if (!result) {
            throw new Error("This ad doesn't exist");
        } else if (userId && result.user.toString() !== userId) {
            throw new Error("You don't have permission to modify this ad");
        }
    });
}

module.exports = {createAd, getAd, deleteAd, modifyAdState, getUserAds, getAds, checkAdExistanceAndOwnership}



