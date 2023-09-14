const {createAd, getAd, deleteAd, modifyAdState, getUserAds, getAds} = require("../services/adServices");

const createAdHandler = async (req, res) => {
    try {
        const ad = await createAd(req.body.listingId, req.userId);
        res.status(200).json({ ad });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getAdHandler = async (req, res) => {
    try {
        const ad = await getAd(req.body.listingId);
        res.status(200).json({ ad });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const deleteAdHandler = async (req, res) => {
    try {
        const ad = await deleteAd(req.body.listingId);
        res.status(200).json({ ad });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const modifyAdStateHandler = async (req, res) => {
    try {
        await modifyAdState(req.body.listingId, req.body.state);
        res.status(200).json({ message: "ad state modified successfully" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getUserAdsHandler = async (req, res) => {
    try {
        const ads = await getUserAds(req.userId);
        res.status(200).json({ ads });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getAdsHandler = async (req, res) => {
    try {
        const ads = await getAds();
        res.status(200).json({ ads });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


module.exports = {createAdHandler, getAdHandler, deleteAdHandler, modifyAdStateHandler, getUserAdsHandler, getAdsHandler}