const cache = require('../../cache/config');
const { reply } = require('../helpers');

const fetchRooms = (hotelId, respond) => {
  const pattern = `${hotelId}:room:*`;
  cache.keys(pattern).then(keys => {
    const rooms = [];
    keys
      .reduce(
        (promiseChain, key) =>
          cache.hgetall(key).then(room => {
            const newRoom = { ...room };
            if (newRoom.status === 'Available') {
              newRoom.customerName = '( empty )';
            }
            newRoom.roomNumber = key.split(':')[2];
            return rooms.push(newRoom);
          }),
        Promise.resolve()
      )
      .then(() => {
        respond(rooms);
      });
  });
};

module.exports = client =>
  fetchRooms(1, rooms => {
    if (!rooms) {
      return reply(client, {
        type: 'FETCH_ROOMS_ERROR',
      });
    }
    return reply(client, {
      type: 'FETCH_ROOMS_SUCCESS',
      rooms,
    });
  });
