const room = require('../../services/room');
const { reply } = require('../helpers');

const handleSuccess = (client, newRoom) => {
  reply(client, {
    type: 'app/FrontDesk/CREATE_ROOM_SUCCESS',
    room: newRoom,
  });
};

const handleFail = (client, err) =>
  reply(client, {
    type: 'app/FrontDesk/CREATE_ROOM_ERROR',
    err,
  });

module.exports = async (client, action) => {
  try {
    const { roomNumber, hotelId } = action;
    const newRoom = await room.create(hotelId, roomNumber);
    return handleSuccess(client, newRoom);
  } catch (err) {
    return handleFail(client, err);
  }
};
