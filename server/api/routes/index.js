// Export route actions here!
const auth = require('./auth');
const customer = require('./customer');
const employee = require('./employee');
const stays = require('./stays');
const hotels = require('./hotels');

module.exports = {
  auth,
  stays,
  customer,
  employee,
  hotels,
};
