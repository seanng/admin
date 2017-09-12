// const { Hotel } = require('../../db/config');
const { Hotel } = require('../../db/models');
const { reply } = require('../helpers');

const reducer = (id, respond) => {
  Hotel.findOne({ where: { id } })
    .then(hotel => respond(null, hotel))
    .catch(err => respond(err));
};

module.exports = (client, action) =>
  reducer(action.id, (err, info) => {
    if (err) {
      console.error('error getting hotel info!', err);
      return reply(client, {
        type: 'GET_HOTEL_INFO_ERROR',
      });
    }
    return reply(client, {
      type: 'app/HotelProfile/GET_HOTEL_INFO_SUCCESS',
      info,
    });
  });
