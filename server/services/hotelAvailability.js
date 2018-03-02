const { Stay } = require('../db/models');

const getHotelAvailability = hotelId =>
  Stay.count({
    where: {
      hotelId,
      status: 'AVAILABLE',
    },
  }).then(availableRooms => !!availableRooms && availableRooms > 0);

module.exports = {
  getHotelAvailability,
};
