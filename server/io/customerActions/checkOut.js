const io = require('../../io');
const { checkOut } = require('../../services/payments');
const { reply, emitToHotel } = require('../helpers');
const { validateToken } = require('../../db/helpers');

const handleSuccess = (client, data) => {
  emitToHotel(io, data.hotelId, {
    type: 'app/FrontDesk/SOCKET_CHECK_OUT',
    stayId: data.stayId,
  });

  reply(client, {
    type: 'CHECK_OUT_BOOKING_SUCCESS',
    data,
  });
};

const handleFail = (client, errorMsg) =>
  reply(client, {
    type: 'CHECK_OUT_BOOKING_FAILURE',
    errorMsg,
  });

module.exports = async (client, action) => {
  try {
    const { stayId, hotelId, checkInTime, token } = action;
    const { userId } = validateToken(token);
    const data = checkOut({ customerId: userId, hotelId, stayId, checkInTime });
    return handleSuccess(client, data);
  } catch (error) {
    return handleFail(client, error);
  }
};
