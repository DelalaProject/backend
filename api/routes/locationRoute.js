
const Route = require('express').Router();
const {verifyToken} = require('../middlewares/authMiddlewares');
const {createLocationHandler, getLocationHandler, getLocationsHandler, deleteLocationHandler, updateLocationHandler} = require('../controllers/locationController');
const { verifyLocationInfo, checkLocationExistance } = require('../middlewares/locationMiddlewares');


Route.post(
    '/create',[
    verifyToken,
    verifyLocationInfo],
    createLocationHandler,
);

Route.get(
    '/getOne',
    getLocationHandler,
);

Route.get(
    '/getAll',
    getLocationsHandler
);

Route.delete(
    '/delete',
    [verifyToken,
    checkLocationExistance],
    deleteLocationHandler,
);

Route.put(
    '/update',[
    verifyToken,
    checkLocationExistance],
    updateLocationHandler,
);

module.exports = Route;