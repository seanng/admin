const { Employee } = require('../../db/models');
const logger = require('../../logger');
// const { employee: employeeService } = require('../../services');
const { signToken } = require('../../db/helpers');
const { linkEmployeeToHotelSockets } = require('../helpers');
const { reply } = require('../helpers');

const handleSuccess = (client, user) =>
  reply(client, {
    type: 'app/Login/EMPLOYEE_LOGIN_SUCCESS',
    token: signToken(user.id),
    user,
  });

const handleFail = (client, err) => {
  reply(client, {
    type: 'app/Login/EMPLOYEE_LOGIN_ERROR',
    msg: err,
  });
};

module.exports = async (client, action) => {
  try {
    const { email, password } = action.info;
    const employee = await Employee.fetchOne({ email });
    await employee.comparePassword(password);
    linkEmployeeToHotelSockets(client, employee.hotelId);
    return handleSuccess(client, employee);
  } catch (err) {
    logger.error(err);
    return handleFail(client, err);
  }
};
