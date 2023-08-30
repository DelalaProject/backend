const {
    createPhoneNumber,
    getPhoneNumbers,
    deletePhoneNumber,
    updatePhoneNumber,
    getPhoneNumber,
} = require("../services/phoneNumberService");


const createPhoneNumberHandler = async (req, res) => {
    try {
        const phoneNumber = await createPhoneNumber(req, res);
        return res.status(200).json(phoneNumber);
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error.message});
    }
}

const getPhoneNumbersHandler = async (req, res) => {
    try {
        const phoneNumbers = await getPhoneNumbers(req, res);
        return res.status(200).json(phoneNumbers);
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error.message});
    }
}

const getPhoneNumberHandler = async (req, res) => {
    try {
        const phoneNumber = await getPhoneNumber(req, res);
        return res.status(200).json(phoneNumber);
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error.message});
    }
}

const deletePhoneNumberHandler = async (req, res) => {
    try {
        await deletePhoneNumber(req, res);
        return res.status(200).json({message: "phone number deleted successfully"});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error.message});
    }
}

const updatePhoneNumberHandler = async (req, res) => {
    try {
        const updatedPhoneNumber = await updatePhoneNumber(req, res);
        return res.status(200).json({message: "phone number updated successfully", updatedPhoneNumber});
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: error.message});
    }
}

module.exports = {createPhoneNumberHandler, getPhoneNumbersHandler, deletePhoneNumberHandler, updatePhoneNumberHandler, getPhoneNumberHandler};