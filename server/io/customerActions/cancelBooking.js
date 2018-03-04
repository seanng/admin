const roomBooking = require('../../services/roomBooking');
const { validateToken } = require('../../db/helpers');
const { emitToHotel, reply } = require('../helpers');

function cancelBooking(token, stayId, hotelId, io, respond) {
  validateToken(token, (err, tokenInfo) => {
    const customerId = tokenInfo.userId;
    roomBooking
      .cancel(customerId, stayId)
      .then(() => {
        emitToHotel(io, hotelId, {
          type: 'app/FrontDesk/SOCKET_CANCEL_BOOKING',
          stayId,
        });
        respond(null, 'success');
      })
      .catch(error => {
        console.log('what is error? ', error);
        respond(error);
      });
  });
}

module.exports = (client, action, io) =>
  cancelBooking(
    action.token,
    action.stayId,
    action.hotelId,
    io,
    (errorMsg, msg) => {
      if (errorMsg) {
        return reply(client, {
          type: 'CANCEL_BOOKING_FAILURE',
          errorMsg,
        });
      }
      return reply(client, {
        type: 'CANCEL_BOOKING_SUCCESS',
        msg,
      });
    }
  );
