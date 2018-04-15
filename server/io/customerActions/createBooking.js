const io = require('../../io');
const { room } = require('../../services');
const { validateToken } = require('../../db/helpers');
const { emitToHotel, reply } = require('../helpers');
const logger = require('../../logger');

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
    const { userId } = await validateToken(action.token);
    // validate if the card actually works.
    const booking = await room.book(userId, action.hotel);
    return handleSuccess(client, booking, customerName, action.hotel.id);
  } catch (error) {
    logger.error(error);
    return handleFail(client, error);
  }
};
