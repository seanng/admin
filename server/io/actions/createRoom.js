const cache = require('../../cache/config');
const { reply } = require('../helpers');

const createRoom = (hotelId, roomNumber, respond) => {
  /* create new room in redis. we'll be temporarily using a fake hotelId of "111", so all rooms in the cache will be part of rooms key 111.

  redis rooms cache should look like this:
    {
      111:room:roomNumber: {
        roomType,
        employeeId,
        status,
        bookingTime,
        checkInTime,
        checkOutTime,
        guestId,
      },
      // for faster access in mobile app.
      111:available: Set of roomNumbers,
    } */

  if (!roomNumber) return respond('enter roomNumber');

  const key = `${hotelId}:room:${roomNumber}`;
  // THIS IS TEMPORARILY HARDCODED
  const employeeId = '123';
  // First, make sure the room does not exist
  return cache.exists(key).then(exists => {
    if (exists * 1) {
      return respond('exists');
    }
    // Second, add room to the available rooms set
    cache.sadd(`${hotelId}:available`, roomNumber);
    // Third, create new hash in Redis for the room
    return cache
      .hmset(key, 'status', 'Available', 'employeeId', employeeId)
      .then(() =>
        respond(null, {
          roomNumber,
          employeeId,
          customerName: null,
          status: 'Available',
        })
      )
      .catch(error => {
        respond(error);
      });
  });
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
