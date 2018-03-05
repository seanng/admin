const io = require('../../io');
const room = require('../../services/room');
const { reply, emitToCustomer } = require('../helpers');

module.exports = (client, action) =>
  new Promise((resolve, reject) => {
    room
      .checkIn(action.stayId)
      .then(result => {
        const data = result[1];
        emitToCustomer(io, action.customerId, {
          type: 'SOCKET_CHECKED_IN',
          data,
        });
        reply(client, {
          type: 'app/FrontDesk/CHECK_IN_SUCCESS',
          data,
        });
        resolve();
      })
      .catch(err => {
        reply(client, {
          type: 'app/FrontDesk/CHECK_IN_ERROR',
          err,
        });
        reject(err);
      });
  });
