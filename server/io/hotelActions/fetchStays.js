const { fetchHotelHistory } = require('../../services/stays');
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

module.exports = (client, action) =>
  new Promise((resolve, reject) => {
    fetchHotelHistory(action.hotelId)
      .then(stays => resolve(handleSuccess(client, stays)))
      .catch(error => reject(handleFail(client, error)));
  });
