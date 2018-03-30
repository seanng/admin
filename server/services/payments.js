const { getConfigurationValue } = require('../config/env');
const stripe = require('stripe')(getConfigurationValue('stripeSecretKey'));
const logger = require('../logger');
const { validateToken } = require('../db/helpers');
const { updateProfile } = require('./customer');
const { Customer } = require('../db/models');

const getCustomerStripeId = id =>
  Customer.findById(id, {
    attributes: ['stripeId'],
  })
    .then(({ stripeId, email }) => {
      if (stripeId) {
        return stripeId;
      }
      return stripe.customers
        .create({ email })
        .then(response =>
          updateProfile({
            id,
            stripeId: response.id,
          })
        )
        .then(customer => customer.stripeId);
    })
    .catch(err => logger.error('what the fuck man', err));

exports.getStripeIdFromToken = req => {
  const customerId = validateToken(req.headers.authorization).userId;
  return getCustomerStripeId(customerId);
};

exports.createPaymentSource = (stripeId, source) =>
  stripe.customers.createSource(stripeId, { source });

exports.updatePaymentCustomer = (stripeId, params) =>
  stripe.customers.update(stripeId, params).then(response => ({
    defaultMethod: response.default_source,
    paymentMethods: response.sources.data,
  }));

exports.deletePaymentMethod = (stripeId, cardId) =>
  stripe.customers.deleteCard(stripeId, cardId);

exports.getAllPaymentSources = stripeId =>
  stripe.customers.retrieve(stripeId).then(response => ({
    defaultMethod: response.default_source,
    paymentMethods: response.sources.data,
  }));
