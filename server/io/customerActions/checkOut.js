const io = require('../../io');
const room = require('../../services/room');
const { reply, emitToHotel } = require('../helpers');
const { validateToken } = require('../../db/helpers');

// get stripeId from token.userId
// calculate the amount to charge. (Input duration & hotelId to payments.getChargeAmount?)
// pass amount + stripeId + stayId, and create Stripe Charge.

module.exports = (client, action) =>
  new Promise((resolve, reject) => {
    const { token, stayId } = action;
    return validateToken(token, (err, { userId }) =>
      room
        .checkOut(stayId, userId)
        .then(data => {
          emitToHotel(io, action.hotelId, {
            type: 'app/FrontDesk/SOCKET_CHECK_OUT',
            stayId,
          });
          reply(client, {
            type: 'CHECK_OUT_BOOKING_SUCCESS',
            data,
          });
          resolve();
        })
        .catch(errorMsg => {
          reply(client, {
            type: 'CHECK_OUT_BOOKING_FAILURE',
            errorMsg,
          });
          reject(errorMsg);
        })
    );
  });
