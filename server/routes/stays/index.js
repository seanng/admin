const routes = require('express').Router();
const handleTryCatch = require('../../utils/handleTryCatch');
const controller = require('./controller');

routes.put('/', controller.createBooking);
routes.put('/checkin/:id', handleTryCatch(controller.checkIn));

routes.get('/hotel/:id', handleTryCatch(controller.fetchByHotelId));

routes.post('/', handleTryCatch(controller.createRoom));
routes.delete('/:id', handleTryCatch(controller.deleteRoom));

module.exports = routes;
