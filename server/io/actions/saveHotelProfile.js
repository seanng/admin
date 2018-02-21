// const { Hotel } = require('../../db/config');
const { Hotel } = require('../../db/models');

const { reply } = require('../helpers');

const reducer = (hotelInfo, respond) => {
  console.log('the hotelInfo: ', hotelInfo);
  Hotel.update(hotelInfo, { where: { id: hotelInfo.id } })
    .then(() => respond(null, hotelInfo))
    .catch(err => respond(err));
};

module.exports = (client, action) =>
  reducer(action.hotelInfo, (err, hotelInfo) => {
    if (err) {
      return reply(client, {
        type: 'app/HotelProfile/SAVE_HOTEL_PROFILE_ERROR',
        err,
      });
    }
    return reply(client, {
      type: 'app/HotelProfile/SAVE_HOTEL_PROFILE_SUCCESS',
      hotelInfo,
    });
  });
