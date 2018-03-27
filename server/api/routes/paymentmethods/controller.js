// const paymentMethods = require('../../../services/paymentMethods');
const {
  getCustomerStripeId,
  getAllPaymentSources,
  createPaymentSource,
  updatePaymentCustomer,
  deletePaymentMethod,
} = require('../../../services/payments');
const { validateToken } = require('../../../db/helpers');

exports.createPaymentMethod = req => {
  const customerId = validateToken(req.headers.authorization).userId;
  const { tokenId, isDefaultPaymentMethod } = req.body;

  return getCustomerStripeId(customerId)
    .then(stripeId => createPaymentSource(stripeId, tokenId))
    .then(source => {
      if (isDefaultPaymentMethod) {
        updatePaymentCustomer(source.customer, { default_source: source.id });
      }
      return source;
    });
};

exports.getAllPaymentMethods = req => {
  const customerId = validateToken(req.headers.authorization).userId;

  return getCustomerStripeId(customerId).then(stripeId =>
    getAllPaymentSources(stripeId)
  );
};

exports.makeDefaultPaymentMethod = (req, paymentMethodId) => {
  const customerId = validateToken(req.headers.authorization).userId;
  return getCustomerStripeId(customerId).then(stripeId =>
    updatePaymentCustomer(stripeId, { default_source: paymentMethodId })
  );
};

exports.deletePaymentMethod = (req, paymentMethodId) => {
  const customerId = validateToken(req.headers.authorization).userId;
  return getCustomerStripeId(customerId).then(stripeId =>
    deletePaymentMethod(stripeId, paymentMethodId)
  );
};
