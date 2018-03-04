const { reply } = require('../helpers');
const { Stay, Customer } = require('../../db/models');

const fetchRooms = (hotelId, respond) => {
  Stay.findAll({
    attributes: [
      'id',
      'customerId',
      'status',
      'bookingTime',
      'checkInTime',
      'roomNumber',
    ],
    where: {
      hotelId,
      status: {
        $or: ['AVAILABLE', 'BOOKED', 'CHECKED_IN'],
      },
    },
    include: [
      {
        model: Customer,
        attributes: ['firstName', 'lastName'],
      },
    ],
  }).then(stays => respond(stays));
};

module.exports = client =>
  fetchRooms(1, rooms => {
    if (!rooms) {
      return reply(client, {
        type: 'app/FrontDesk/FETCH_ROOMS_ERROR',
      });
    }
    return reply(client, {
      type: 'app/FrontDesk/FETCH_ROOMS_SUCCESS',
      rooms,
    });
  });
