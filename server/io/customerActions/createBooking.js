const roomBooking = require('../../services/roomBooking');
const { validateToken } = require('../../db/helpers');
const { emitToHotel, reply } = require('../helpers');

function createBooking(token, hotelId, profile, io, respond) {
  validateToken(token, (err, tokenInfo) => {
    const customerId = tokenInfo.userId;
    roomBooking
      .book(customerId, hotelId)
      .then(booking => {
        emitToHotel(io, hotelId, {
          type: 'app/FrontDesk/SOCKET_CREATE_BOOKING',
          booking: {
            ...booking,
            customerName: `${profile.firstName} ${profile.lastName}`,
          },
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
  createBooking(
    action.token,
    action.hotelId,
    action.profile,
    io,
    (errorMsg, data) => {
      if (errorMsg) {
        return reply(client, {
          type: 'CREATE_BOOKING_FAILURE',
          errorMsg,
        });
      }
      return reply(client, {
        type: 'CREATE_BOOKING_SUCCESS',
        data,
      });
    }
  );
