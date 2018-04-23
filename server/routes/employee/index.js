const routes = require('express').Router();
const controller = require('./controller');
const handleTryCatch = require('../../utils/handleTryCatch');

routes.post('/', handleTryCatch(controller.addEmployee));
routes.get('/', handleTryCatch(controller.getEmployee));
routes.put('/', handleTryCatch(controller.putEmployee));

module.exports = routes;
