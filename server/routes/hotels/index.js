const routes = require('express').Router();
const controller = require('./controller');
const handleTryCatch = require('../../utils/handleTryCatch');

routes.post('/', handleTryCatch(controller.createHotel));
routes.get('/:id', handleTryCatch(controller.getHotels));

module.exports = routes;
