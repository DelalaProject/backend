const Router = require('express').Router();

const {
    getUserHandler,
    updateUserInfoHandler,
    updateUserPasswordHandler,
    deleteUserHandler,
    searchUserHandler,
} = require("../controllers/userController");

const {verifyToken} = require('../middlewares/authMiddlewares');
const {checkPasswordMatch, checkUserExistance} = require('../middlewares/userMiddlewares');

Router.get(
    '/getOne',
    getUserHandler,
);

Router.get(
    '/search',
    searchUserHandler,
);

Router.put(
    '/update',
    [
        verifyToken,
    ],
    updateUserInfoHandler,
)

Router.put(
    '/updatePassword',
    [
        verifyToken,
        checkPasswordMatch,
    ],
    updateUserPasswordHandler,
);


Router.delete(
    '/delete',
    [
        verifyToken,
        checkPasswordMatch,
    ],
    deleteUserHandler,
);

module.exports = Router;



