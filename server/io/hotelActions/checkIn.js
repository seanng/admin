const { reply, emitToCustomer } = require('../helpers');
const { Stay } = require('../../db/models');

const checkIn = (stayId, customerId, respond) =>
  Stay.update(
    {
      status: 'CHECKED_IN',
      checkInTime: new Date().getTime(),
    },
    {
      attributes: ['checkInTime', 'status', 'id'],
      where: { id: stayId },
      returning: true,
      plain: true,
    }
  )
    .then(result => respond(null, result[1]))
    .catch(err => respond(err));

module.exports = (client, action, io) =>
  checkIn(action.stayId, action.customerId, (err, data) => {
    if (err) {
      return reply(client, {
        type: 'app/FrontDesk/CHECK_IN_ERROR',
        err,
      });
    }
    emitToCustomer(io, action.customerId, {
      type: 'SOCKET_CHECKED_IN',
      data,
    });
    return reply(client, {
      type: 'app/FrontDesk/CHECK_IN_SUCCESS',
      data,
    });
  });
