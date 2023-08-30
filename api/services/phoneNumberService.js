const PhoneNumber = require("../models/PhoneNumber");

const createPhoneNumber = async (req, res) => {
    const phoneNumber = new PhoneNumber({
        user: req.userId,
        number: req.body.number,
        code: req.body.code,
    });

    await phoneNumber.save();

    return phoneNumber;
}

const getPhoneNumber = async (req, res) => {
    let phoneNumber;
    await PhoneNumber.findById(req.query.id).then((result) => {
        if (!result) {
            throw new Error("Phone number with this id does not exist!");
        } else {
            phoneNumber = result;
        }
    });

    return phoneNumber;
}

const getPhoneNumbers = async (req, res) => {
    let phoneNumbers;
    await PhoneNumber.find({user: req.query.userId}).then((results) => {
        phoneNumbers = results;
    })

    return phoneNumbers;
}

const deletePhoneNumber = async (req, res) => {
    await PhoneNumber.deleteOne({
        _id: req.query.id,
        user: req.userId,
    }).then((result) => {
        if (result.deletedCount === 0) {
            throw new Error("You don't have permission to delete this phone number");
        }
    });
}

const updatePhoneNumber = async (req, res) => {
    let phoneNumber;

    await PhoneNumber.findOneAndUpdate({
        _id: req.query.id,
        user: req.userId,
    }, {
        number: req.body.number ? req.body.number : this.number,
        code: req.body.code ? req.body.code : this.code,
    }).then((result) => {
        if (!result) {
            throw new Error("You don't have permission to update this phone number");
        } else {
            phoneNumber = result;
        }
    });

    return phoneNumber;
}

module.exports = {
    createPhoneNumber,
    getPhoneNumbers,
    deletePhoneNumber,
    updatePhoneNumber,
    getPhoneNumber,
}