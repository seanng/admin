const routes = require('express').Router();
const controller = require('./controller');
const handleTryCatch = require('../../utils/handleTryCatch');

routes.post('/', handleTryCatch(controller.createNewCustomer));
routes.get('/', handleTryCatch(controller.getCustomer));
routes.put('/', handleTryCatch(controller.putCustomer));

module.exports = routes;
