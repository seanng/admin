/* eslint consistent-return:0 */
const controller = require('./controller');

module.exports = (req, params) =>
  new Promise((res, rej) => {
    if (req.method === 'POST')
      return controller.createNewCustomer(res, rej, req, params);
    if (req.method === 'GET')
      return controller.getCustomer(res, rej, req, params);
    if (req.method === 'PUT')
      return controller.putCustomer(res, rej, req, params);
  });
