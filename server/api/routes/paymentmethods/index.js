/* eslint consistent-return:0 */
const controller = require('./controller');

module.exports = (req, params) => {
  if (req.method === 'PUT') {
    const paymentMethodId = params[0];
    if (paymentMethodId) {
      return controller.makeDefaultPaymentMethod(req, paymentMethodId);
    }
  }

  if (req.method === 'GET') {
    return controller.getAllPaymentMethods(req);
  }

  if (req.method === 'POST') {
    return controller.createPaymentMethod(req);
  }
};
