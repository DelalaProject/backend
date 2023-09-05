const Follow = require("../models/Follow");


const follow = async (req, res) => {
    

    const follow = new Follow({
        follower: req.userId,
        followed: req.body.followedId,
    });

    await follow.save();

    return follow;
}

const unfollow = async (req, res) => {
    await Follow.deleteOne({follower: req.userId, followed: req.body.followedId});
    
}

const getFollowings = async (req, res) => {
    let followings;

    await Follow.find({follower: req.userId}).then(
        (result) => {
            followings = result;
        }
    );

    return followings;
}

module.exports = {follow, unfollow, getFollowings}