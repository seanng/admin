const routes = require('express').Router();
const controller = require('./controller');
const handleTryCatch = require('../../utils/handleTryCatch');

routes.post('/', handleTryCatch(controller.addEmployee));
routes.get('/:hotelId', handleTryCatch(controller.getHotelEmployees));
routes.put('/', handleTryCatch(controller.putEmployee));
routes.delete('/:id', handleTryCatch(controller.deleteEmployee));

module.exports = routes;
