const hotel = require('../../services/hotel');
const { reply } = require('../helpers');

module.exports = (client, action) =>
  new Promise((resolve, reject) => {
    hotel
      .fetchOne(action.id)
      .then(info =>
        resolve(
          reply(client, {
            type: 'app/HotelProfile/GET_HOTEL_INFO_SUCCESS',
            info,
          })
        )
      )
      .catch(err =>
        reject(
          reply(client, {
            type: 'GET_HOTEL_INFO_ERROR',
            err,
          })
        )
      );
  });
