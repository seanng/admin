const { Stay, Hotel, Customer } = require('../../db/models');
const { reply } = require('../helpers');

const fetchPastStays = (hotelId, respond) => {
  Stay.findAll({
    attributes: [
      'id',
      'bookingTime',
      'checkInTime',
      'checkOutTime',
      'roomNumber',
      'roomCharge',
      'totalCharge',
    ],
    where: {
      hotelId,
      status: 'CHECKED_OUT',
    },
    include: [Customer, Hotel],
  })
    .then(stays => {
      const newStays = stays.map(stay => ({
        id: stay.id,
        bookingTime: stay.bookingTime,
        checkInTime: stay.checkInTime,
        checkOutTime: stay.checkOutTime,
        costCurrency: stay.hotel.costCurrency,
        customerName: `${stay.customer.firstName} ${stay.customer.lastName}`,
        roomNumber: stay.roomNumber,
        roomCharge: stay.roomCharge,
        totalCharge: stay.totalCharge,
      }));
      respond(null, newStays);
    })
    .catch(err => respond(err));
};

module.exports = client =>
  fetchPastStays(1, (err, stays) => {
    if (err) {
      console.log('the err? ', err);
      return reply(client, {
        type: 'app/PastStays/FETCH_STAYS_ERROR',
      });
    }
    return reply(client, {
      type: 'app/PastStays/FETCH_STAYS_SUCCESS',
      stays,
    });
  });