const Employee = require('../../actions/employee/employee.model');
const { signToken } = require('../../db/helpers');
const { reply } = require('../helpers');

module.exports = (client, action) => {
  const { email, password } = action.info;

  Employee.findOne({ where: { email } }).then(user =>
    user.comparePassword(password, (err, isMatch) => {
      console.log('ismatch?', isMatch);
      if (err) {
        return reply(client, {
          type: 'app/Login/EMPLOYEE_LOGIN_ERROR',
          err: 'DB Error',
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
        err: 'Invalid password',
      });
    })
  );
};
