const { validateToken } = require('../../db/helpers');
const { reply, linkEmployeeToHotelSockets } = require('../helpers');
const { employee: employeeService } = require('../../services');

const handleSuccess = (client, user, token) =>
  reply(client, {
    type: 'app/Login/EMPLOYEE_LOGIN_SUCCESS',
    user,
    token,
  });

const handleFail = (client, err, token) =>
  reply(client, {
    type: 'app/app/INVALIDATE_TOKEN',
    err,
    token,
  });

module.exports = async (client, action) => {
  try {
    const { userId } = await validateToken(action.token);
    const employee = await employeeService.fetchOne({ id: userId });
    linkEmployeeToHotelSockets(client, employee.hotelId);
    return handleSuccess(client, employee, action.token);
  } catch (error) {
    handleFail(client, error, action.token);
    throw error;
  }
};
