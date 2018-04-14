const Employee = require('../../db/models/Employee');
const { reply } = require('../helpers');

const handleSuccess = (client, employees) =>
  reply(client, {
    type: 'app/TeamManagement/FETCH_EMPLOYEES_SUCCESS',
    employees,
  });

const handleFail = (client, err) =>
  reply(client, {
    type: 'app/TeamManagement/FETCH_EMPLOYEES_ERROR',
    err,
  });

module.exports = async (client, action) => {
  try {
    const employees = await Employee.fetchAll({ hotelId: action.hotelId });
    return handleSuccess(client, employees);
  } catch (error) {
    return handleFail(client, error);
  }
};
