const { reply, emitToHotel } = require('../helpers');
const { validateToken } = require('../../db/helpers');
const { Stay } = require('../../db/models');

const checkOut = (token, stayId, respond) => {
  validateToken(token, (err, tokenInfo) => {
    const customerId = tokenInfo.userId;
    Stay.update(
      {
        status: 'CHECKED_OUT',
        checkOutTime: new Date().getTime(),
      },
      {
        attributes: [
          'bookingTime',
          'checkInTime',
          'roomCharge',
          'roomNumber',
          'totalCharge',
          'costCurrency',
          'checkOutTime',
          'status',
          'id',
        ],
        where: { id: stayId, customerId },
        returning: true,
        plain: true,
        raw: true,
      }
    )
      .then(data => {
        console.log('the data is??? ', data);
        console.log('the data1 is??? ', data[1]);
        respond(null, data[1]);
      })
      .catch(error => respond(error));
  });
};

module.exports = (client, action, io) =>
  checkOut(action.token, action.stayId, (errorMsg, data) => {
    if (errorMsg) {
      console.log('errorMsg', errorMsg);
      return reply(client, {
        type: 'CHECK_OUT_BOOKING_FAILURE',
        errorMsg,
      });
    }
    emitToHotel(io, action.hotelId, {
      type: 'app/FrontDesk/SOCKET_CHECK_OUT',
      data: {
        ...data,
        customerName: action.customerName,
      },
    });
    return reply(client, {
      type: 'CHECK_OUT_BOOKING_SUCCESS',
      data,
    });
  });
