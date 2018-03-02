const { reply } = require('../helpers');
const { Stay } = require('../../db/models');

const createRoom = (hotelId, roomNumber, respond) => {
  if (!roomNumber) {
    return respond('enter roomNumber');
  }
  return Stay.create({
    hotelId,
    roomNumber,
    status: 'AVAILABLE',
  }).then(newStay => respond(null, newStay));
};

module.exports = (client, action) =>
  // hotelId obtained from socket token.
  // for now, pass in fake hotelId of 1
  createRoom(1, action.roomNumber, (err, room) => {
    if (err) {
      return reply(client, {
        type: 'CREATE_ROOM_ERROR',
        err,
      });
    }
    return reply(client, {
      type: 'app/FrontDesk/CREATE_ROOM_SUCCESS',
      room,
    });
  });
