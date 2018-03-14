const io = require('../../io');
const room = require('../../services/room');
const { reply, emitToHotel } = require('../helpers');
const { validateToken } = require('../../db/helpers');

module.exports = (client, action) =>
  new Promise((resolve, reject) => {
    const { token, stayId } = action;
    validateToken(token, (err, tokenInfo) => {
      room
        .checkOut(stayId, tokenInfo.userId)
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
        });
    });
  });
