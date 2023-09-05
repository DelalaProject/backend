const Follow = require("../models/Follow");

const checkFollowNonExistance = async (req, res, next) => {
    try {
        await Follow.findOne({follower: req.userId, followed: req.body.followedId}).then(
            (result) => {
                if (result) return res.status(400).send({message: "Already following"});
                else next();
            }
        ).catch(
            (error) => {
                console.log(error);
                return res.status(500).send({message: error.message});
            }
        );
    } catch (error) {
        console.log(error);
        return res.status(500).send({message: error.message});
    }
}

module.exports = {checkFollowNonExistance}