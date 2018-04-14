const Employee = require('../../db/models/Employee');
const { reply } = require('../helpers');

const handleSuccess = (client, employeeId) =>
  reply(client, {
    type: 'app/TeamManagement/DELETE_EMPLOYEE_SUCCESS',
    employeeId,
  });

const handleFail = (client, err) =>
  reply(client, {
    type: 'app/TeamManagement/DELETE_EMPLOYEE_FAIL',
    err,
  });

module.exports = async (client, { employeeId }) => {
  try {
    await Employee.delete({ id: employeeId });
    return handleSuccess(client, employeeId);
  } catch (err) {
    return handleFail(client, err);
  }
};
