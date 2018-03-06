const { validateToken } = require('../../db/helpers');
const { reply, linkEmployeeToHotelSockets } = require('../helpers');
const employee = require('../../services/employee');

module.exports = (client, action) =>
  new Promise((resolve, reject) => {
    const { token } = action;
    return validateToken(token, (validationErr, decoded) => {
      if (validationErr) {
        return reject(validationErr);
      }
      return employee
        .fetchOne(decoded.userId)
        .then(user => {
          linkEmployeeToHotelSockets(client, user.hotelId);
          resolve(
            reply(client, {
              type: 'app/Login/EMPLOYEE_LOGIN_SUCCESS',
              user,
              token,
            })
          );
        })
        .catch(err => {
          reject(
            reply(client, {
              type: 'app/app/INVALIDATE_TOKEN',
              err,
              token,
            })
          );
        });
    });
  });
