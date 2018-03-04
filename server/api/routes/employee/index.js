/* eslint consistent-return:0 */

const controller = require('./controller');

module.exports = (req, params) =>
  new Promise((res, rej) => {
    if (req.method === 'POST')
      return controller.createNewEmployee(res, rej, req, params);
    if (req.method === 'GET')
      return controller.getEmployee(res, rej, req, params);
    if (req.method === 'PUT')
      return controller.putEmployee(res, rej, req, params);
  });
