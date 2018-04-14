/* eslint consistent-return:0 */
const controller = require('./controller');

module.exports = (req, params) => {
  if (req.method === 'POST') {
    return controller.createNewCustomer(req, params);
  }

  if (req.method === 'GET') {
    return controller.getCustomer(req, params);
  }

  if (req.method === 'PUT') {
    return controller.putCustomer(req, params);
  }
};
