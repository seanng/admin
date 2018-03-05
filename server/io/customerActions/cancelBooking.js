const io = require('../../io');
const room = require('../../services/room');
const { validateToken } = require('../../db/helpers');
const { emitToHotel, reply } = require('../helpers');

module.exports = (client, action) =>
  new Promise((resolve, reject) => {
    const { token, stayId, hotelId } = action;
    validateToken(token, (err, tokenInfo) => {
      const customerId = tokenInfo.userId;
      room
        .cancel(stayId, customerId)
        .then(() => {
          emitToHotel(io, hotelId, {
            type: 'app/FrontDesk/SOCKET_CANCEL_BOOKING',
            stayId,
          });
          reply(client, {
            type: 'CANCEL_BOOKING_SUCCESS',
          });
          resolve();
        })
        .catch(errorMsg => {
          console.log('errorMsg??', errorMsg);
          reply(client, {
            type: 'CANCEL_BOOKING_FAILURE',
            errorMsg,
          });
          reject();
        });
    });
  });
