const cache = require('../../cache/config');
const { reply } = require('../helpers');

const makeAvailable = (hotelId, roomNumber, respond) => {
  const key = `${hotelId}:room:${roomNumber}`;
  cache
    .hmset(key, 'status', 'Available')
    .then(() => respond(null))
    .catch(err => respond(err));
};

module.exports = (client, action) => {
  const { roomNumber, key } = action;
  return makeAvailable(1, roomNumber, err => {
    if (err) {
      return reply(client, {
        type: 'app/FrontDesk/MAKE_AVAILABLE_ERROR',
        err,
      });
    }
    return reply(client, {
      type: 'app/FrontDesk/MAKE_AVAILABLE_SUCCESS',
      roomNumber,
      key,
    });
  });
};
