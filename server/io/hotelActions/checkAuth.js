const { validateToken } = require('../../db/helpers');
const { reply, linkEmployeeToHotelSockets } = require('../helpers');
const { Employee } = require('../../db/models');

const checkAuth = (token, respond) => {
  validateToken(token, (err, decoded) => {
    if (err) {
      return respond(err);
    }
    return Employee.findOne({ where: { id: decoded.userId } }).then(user => {
      if (user) {
        respond(null, user);
      }
    });
  });
};

module.exports = (client, action) => {
  const { token } = action;
  return checkAuth(token, (err, user) => {
    if (err) {
      return reply(client, {
        type: 'app/app/INVALIDATE_TOKEN',
        err,
        token,
      });
    }
    linkEmployeeToHotelSockets(client, user.hotelId);
    return reply(client, {
      type: 'app/Login/EMPLOYEE_LOGIN_SUCCESS',
      user,
      token,
    });
  });
};