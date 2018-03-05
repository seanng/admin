const room = require('../../services/room');
const { reply } = require('../helpers');

module.exports = (client, action) =>
  new Promise((resolve, reject) => {
    const { roomNumber, hotelId } = action;
    room
      .create(hotelId, roomNumber)
      .then(newRoom => {
        reply(client, {
          type: 'app/FrontDesk/CREATE_ROOM_SUCCESS',
          room: newRoom,
        });
        resolve();
      })
      .catch(err => {
        reply(client, {
          type: 'app/FrontDesk/CREATE_ROOM_ERROR',
          err,
        });
        reject(err);
      });
  });
