// Export route actions here!
const auth = require('./auth');
const customer = require('./customer');
const employee = require('./employee');
const stays = require('./stays');

module.exports = {
  auth,
  stays,
  customer,
  employee,
};
