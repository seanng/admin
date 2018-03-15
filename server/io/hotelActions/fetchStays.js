const staysService = require('../../services/stays');
const { reply } = require('../helpers');

module.exports = (client, action) =>
  new Promise((resolve, reject) => {
    staysService
      .fetchHotelHistory(action.hotelId)
      .then(stays => {
        resolve(
          reply(client, {
            type: 'app/PastStays/FETCH_STAYS_SUCCESS',
            stays,
          })
        );
      })
      .catch(error => {
        reject(
          reply(client, {
            type: 'app/PastStays/FETCH_STAYS_ERROR',
            error,
          })
        );
      });
  });
