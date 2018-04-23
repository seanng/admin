const routes = require('express').Router();
const handleTryCatch = require('../../utils/handleTryCatch');
const controller = require('./controller');

routes.put('/', controller.createBooking);
routes.get('/active/:id', handleTryCatch(controller.fetchActive));
routes.post('/', handleTryCatch(controller.createRoom));

module.exports = routes;
