const hotel = require('../../services/hotel');
const { reply } = require('../helpers');

module.exports = (client, action) =>
  new Promise((resolve, reject) => {
    hotel
      .updateProfile(action.hotelInfo)
      .then(hotelInfo =>
        resolve(
          reply(client, {
            type: 'app/HotelProfile/SAVE_HOTEL_PROFILE_SUCCESS',
            hotelInfo,
          })
        )
      )
      .catch(err =>
        reject(
          reply(client, {
            type: 'app/HotelProfile/SAVE_HOTEL_PROFILE_ERROR',
            err,
          })
        )
      );
  });
