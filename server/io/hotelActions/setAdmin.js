const { Employee } = require('../../db/models');
const { reply } = require('../helpers');

const handleSuccess = (client, employeeId) =>
  reply(client, {
    type: 'app/TeamManagement/SET_ADMIN_SUCCESS',
    employeeId,
  });

const handleFail = (client, err) =>
  reply(client, {
    type: 'app/TeamManagement/SET_ADMIN_FAIL',
    err,
  });

module.exports = async (client, action) => {
  try {
    await Employee.setAdmin(action.employeeId);
    return handleSuccess(client, action.employeeId);
  } catch (error) {
    return handleFail(client, error);
  }
};
