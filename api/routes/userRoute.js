const Router = require('express').Router();

const {
    getUserHandler,
    updateUserInfoHandler,
    updateUserPasswordHandler,
    deleteUserHandler,
    searchUserHandler, 
    reportUserHandler, 
    getUserReportsHandler, 
    deleteUserReportHandler, 
    getUserUserReportHandler, 
    getUserUserReportsHandler
} = require("../controllers/userController");

const {verifyToken} = require('../middlewares/authMiddlewares');
const {checkPasswordMatch, checkUserExistance} = require('../middlewares/userMiddlewares');
const {checkUserReportOwnershipMiddleware} = require('../middlewares/reportMiddlewares.js');

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

Router.post(
    '/report',
    [
        verifyToken,
        checkUserExistance,
    ],
    reportUserHandler,
);


Router.get(
    '/getUserReports',
    getUserReportsHandler,
);


Router.delete(
    '/deleteReport',
    [
        verifyToken,
        checkUserReportOwnershipMiddleware,
    ],
    deleteUserReportHandler,

);

Router.get(
    '/getUserUserReport',
    [
        verifyToken,
    ],
    getUserUserReportHandler,
);

Router.get(
    '/getUserUserReports',
    [
        verifyToken,
    ],
    getUserUserReportsHandler,
);


module.exports = Router;



