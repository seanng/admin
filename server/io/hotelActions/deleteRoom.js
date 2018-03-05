const { reply } = require('../helpers');
const room = require('../../services/room');

module.exports = (client, action) =>
  new Promise((resolve, reject) => {
    room
      .remove(action.stayId)
      .then(() => {
        reply(client, {
          type: 'app/FrontDesk/DELETE_ROOM_SUCCESS',
          id: action.stayId,
        });
        resolve();
      })
      .catch(err => {
        reply(client, {
          type: 'app/FrontDesk/DELETE_ROOM_ERROR',
          err,
        });
        reject(err);
      });
  });
