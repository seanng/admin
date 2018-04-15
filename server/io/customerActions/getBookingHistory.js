const { validateToken } = require('../../db/helpers');
const Stay = require('../../db/models/Stay');
const { reply } = require('../helpers');

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
    const { userId } = validateToken(action.token);
    const bookings = await Stay.fetchCustomerHistory(userId);
    return handleSuccess(client, bookings);
  } catch (error) {
    return handleFail(client, error);
  }
};
