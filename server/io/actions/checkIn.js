const { getCustomerSocket } = require('../directory');
const { reply, convey } = require('../helpers');
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

module.exports = (client, action) =>
  checkIn(action.stayId, action.customerId, (err, data) => {
    if (err) {
      return reply(client, {
        type: 'app/FrontDesk/CHECK_IN_ERROR',
        err,
      });
    }
    const receiverId = getCustomerSocket(action.customerId);
    if (receiverId) {
      convey(client, receiverId, data);
    }
    return reply(client, {
      type: 'app/FrontDesk/CHECK_IN_SUCCESS',
      data,
    });
  });
