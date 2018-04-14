/* eslint consistent-return:0 */

const controller = require('./controller');

module.exports = (req, params) => {
  if (req.method === 'POST') {
    return controller.createNewEmployee(req, params);
  }
  if (req.method === 'GET') {
    return controller.getEmployee(req, params);
  }
  if (req.method === 'PUT') {
    return controller.putEmployee(req, params);
  }
};
