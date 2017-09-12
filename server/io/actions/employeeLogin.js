// const Employee = require('../../actions/employee/employee.model');
const { Employee } = require('../../db/models');
const { signToken } = require('../../db/helpers');
const { reply } = require('../helpers');

module.exports = (client, action) => {
  const { email, password } = action.info;

  Employee.findOne({ where: { email } })
    .then(user =>
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          console.log('the actual err: ', err);
          return reply(client, {
            type: 'app/Login/EMPLOYEE_LOGIN_ERROR',
            msg: 'DB Error',
          });
        } else if (isMatch) {
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
    .catch(err => {
      console.log('what is the error in Catch? ', err);
      return reply(client, {
        type: 'app/Login/EMPLOYEE_LOGIN_ERROR',
        msg: 'No such user',
      });
    });
};
