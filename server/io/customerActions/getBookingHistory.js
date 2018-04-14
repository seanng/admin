const { validateToken } = require('../../db/helpers');
const { reply } = require('../helpers');
const staysService = require('../../services/stays');

const handleSuccess = (client, bookings) =>
  reply(client, {
    type: 'GET_BOOKING_HISTORY_SUCCESS',
    bookings,
  });

const handleFail = (client, errorMsg) =>
  reply(client, {
    type: 'GET_BOOKING_HISTORY_FAIL',
    errorMsg,
  });

module.exports = async (client, action) => {
  try {
    const { userId } = await validateToken(action.token);
    const bookings = await staysService.fetchCustomerHistory(userId);
    return handleSuccess(client, bookings);
  } catch (error) {
    return handleFail(client, error);
  }
};
