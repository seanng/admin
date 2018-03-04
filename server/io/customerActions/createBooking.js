const roomBooking = require('../../services/roomBooking');
const { validateToken } = require('../../db/helpers');
const { emitToHotel, reply } = require('../helpers');

function createBooking(token, hotelId, io, respond) {
  validateToken(token, (err, customer) => {
    const customerId = customer.userId;
    roomBooking
      .book(customerId, hotelId)
      .then(booking => {
        emitToHotel(io, hotelId, {
          type: 'app/FrontDesk/SOCKET_CREATE_BOOKING',
          booking,
        });
        respond(null, booking);
      })
      .catch(error => {
        console.log('what is error? ', error);
        respond(error);
      });
  });
}

module.exports = (client, action, io) =>
  createBooking(action.token, action.hotelId, io, (errorMsg, booking) => {
    if (errorMsg) {
      return reply(client, {
        type: 'CREATE_BOOKING_FAILURE',
        errorMsg,
      });
    }
    return reply(client, {
      type: 'CREATE_BOOKING_SUCCESS',
      booking,
    });
  });
