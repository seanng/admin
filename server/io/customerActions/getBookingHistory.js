const { validateToken } = require('../../db/helpers');
const { reply } = require('../helpers');
const staysService = require('../../services/stays');

module.exports = (client, action) =>
  new Promise((resolve, reject) => {
    const { token } = action;
    validateToken(token, (err, { userId }) => {
      staysService
        .fetchCustomerHistory(userId)
        .then(bookings =>
          resolve(
            reply(client, {
              type: 'GET_BOOKING_HISTORY_SUCCESS',
              bookings,
            })
          )
        )
        .catch(errorMsg => {
          reject(
            reply(client, {
              type: 'GET_BOOKING_HISTORY_FAIL',
              errorMsg,
            })
          );
        });
    });
  });
