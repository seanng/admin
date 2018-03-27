// Export route actions here!
const auth = require('./auth');
const customer = require('./customer');
const employee = require('./employee');
const hotels = require('./hotels');
const profile = require('./profile');
const stays = require('./stays');
const paymentmethods = require('./paymentmethods');

module.exports = {
  auth,
  customer,
  employee,
  hotels,
  profile,
  stays,
  paymentmethods,
};
