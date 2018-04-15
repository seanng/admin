const Stay = require('../../db/models/Stay');
const { reply } = require('../helpers');

const handleSuccess = (client, stays) =>
  reply(client, {
    type: 'app/PastStays/FETCH_STAYS_SUCCESS',
    stays,
  });

const handleFail = (client, error) =>
  reply(client, {
    type: 'app/PastStays/FETCH_STAYS_ERROR',
    error,
  });

module.exports = async (client, action) => {
  try {
    const stays = await Stay.fetchHotelHistory(action.hotelId);
    return handleSuccess(client, stays);
  } catch (error) {
    return handleFail(client, error);
  }
};
