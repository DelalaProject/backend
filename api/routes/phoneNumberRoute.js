const Router = require('express').Router();


const {verifyToken} = require('../middlewares/authMiddlewares');
const {createPhoneNumberHandler, getPhoneNumberHandler, getPhoneNumbersHandler, deletePhoneNumberHandler, updatePhoneNumberHandler} = require('../controllers/phoneNumberController');
const {  checkPhoneNumberExistance } = require('../middlewares/phoneNumberMiddlewares');


Router.post(
    '/create',
    [
        verifyToken,
    ],
    createPhoneNumberHandler,
);

Router.get(
    '/getOne',
    getPhoneNumberHandler,
);

Router.get(
    '/getAll',
    getPhoneNumbersHandler
);

Router.delete(
    '/delete',
    [
        verifyToken,
        checkPhoneNumberExistance,
    ],
    deletePhoneNumberHandler,
);

Router.put(
    '/update',
    [
        verifyToken,
        checkPhoneNumberExistance,
    ],
    updatePhoneNumberHandler,
);

module.exports = Router;