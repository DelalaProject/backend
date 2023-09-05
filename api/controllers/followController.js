const {follow, unfollow} = require("../services/followService");


const followController = async (req, res) => {
    try {
        const result = await follow(req, res);
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
}

const unfollowController = async (req, res) => {
    try {
        await unfollow(req, res);
        res.status(200).send({message: "Unfollowed successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
}

const getFollowingsController = async (req, res) => {
    try {
        const result = await getFollowings(req, res);
        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
}


module.exports = {followController, unfollowController, getFollowingsController}