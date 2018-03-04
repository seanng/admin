const { Employee } = require('../../db/models');
const { signToken } = require('../../db/helpers');
const { linkEmployeeToHotelSockets } = require('../helpers');
const { reply } = require('../helpers');

module.exports = (client, action) => {
  const { email, password } = action.info;

  Employee.findOne({ where: { email } })
    .then(user =>
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return reply(client, {
            type: 'app/Login/EMPLOYEE_LOGIN_ERROR',
            msg: 'DB Error',
          });
        } else if (isMatch) {
          linkEmployeeToHotelSockets(client, user.hotelId);
          return reply(client, {
            type: 'app/Login/EMPLOYEE_LOGIN_SUCCESS',
            token: signToken(user.id),
            user,
          });
        }
        return reply(client, {
          type: 'app/Login/EMPLOYEE_LOGIN_ERROR',
          msg: 'Invalid password',
        });
      })
    )
    .catch(() =>
      reply(client, {
        type: 'app/Login/EMPLOYEE_LOGIN_ERROR',
        msg: 'No such user',
      })
    );
};
