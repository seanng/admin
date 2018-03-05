const io = require('../../io');
const room = require('../../services/room');
const { validateToken } = require('../../db/helpers');
const { emitToHotel, reply } = require('../helpers');

module.exports = (client, action) =>
  new Promise((resolve, reject) => {
    const { token, hotelId, profile } = action;
    validateToken(token, (err, { userId }) => {
      room
        .book(userId, hotelId)
        .then(data => {
          emitToHotel(io, hotelId, {
            type: 'app/FrontDesk/SOCKET_CREATE_BOOKING',
            booking: {
              ...data,
              customerName: `${profile.firstName} ${profile.lastName}`,
            },
          });
          reply(client, {
            type: 'CREATE_BOOKING_SUCCESS',
            data,
          });
          resolve();
        })
        .catch(errorMsg => {
          reply(client, {
            type: 'CREATE_BOOKING_FAILURE',
            errorMsg,
          });
          reject(errorMsg);
        });
    });
  });
