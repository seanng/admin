const io = require('../../io');
const { room } = require('../../services');
const { validateToken } = require('../../db/helpers');
const { emitToHotel, reply } = require('../helpers');

const handleSuccess = (client, data, customerName, hotelId) => {
  emitToHotel(io, hotelId, {
    type: 'app/FrontDesk/SOCKET_CREATE_BOOKING',
    booking: {
      ...data,
      customerName,
    },
  });
  reply(client, {
    type: 'CREATE_BOOKING_SUCCESS',
    data,
  });
};

const handleFail = (client, errorMsg) =>
  reply(client, {
    type: 'CREATE_BOOKING_FAILURE',
    errorMsg,
  });

module.exports = async (client, action) => {
  try {
    const customerName = `${action.profile.firstName} ${
      action.profile.lastName
    }`;
    const userId = await validateToken(action.token);
    const booking = await room.book(userId, action.hotelId);
    return handleSuccess(client, booking, customerName, action.hotelId);
  } catch (error) {
    return handleFail(client, error);
  }
};
