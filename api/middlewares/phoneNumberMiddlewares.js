const PhoneNumber = require("../models/PhoneNumber");

const checkPhoneNumberExistance = async (req, res, next) => {
    await PhoneNumber.findOne({
        _id: req.query.id,
    }).then((result) => {
        if (!result) {
            throw new Error("Phone number with this id does not exist!");
        }
    });
    next();
}

module.exports = { checkPhoneNumberExistance };