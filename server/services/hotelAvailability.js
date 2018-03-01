const cache = require('../cache');

const getHotelAvailability = hotelId =>
  cache
    .smembers(`${hotelId}:available`)
    .then(rooms => !!rooms && rooms.length > 0);

module.exports = {
  getHotelAvailability,
};
