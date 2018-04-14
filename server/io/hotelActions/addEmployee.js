const { reply } = require('../helpers');
const { generatePassword } = require('../../utils/helpers');
const { employee, sendMail } = require('../../services');

const handleSuccess = (client, employees) =>
  reply(client, {
    type: 'app/TeamManagement/ADD_EMPLOYEE_SUCCESS',
    employees,
  });

const handleFail = (client, err) =>
  reply(client, {
    type: 'app/TeamManagement/ADD_EMPLOYEE_FAIL',
    err,
  });

module.exports = async (client, action) => {
  try {
    const newUserDetails = {
      ...action.details,
      password: generatePassword(),
      inviterId: action.userId,
      hotelId: action.hotelId,
    };
    const userInfo = await employee.create(newUserDetails);
    const htmlOptions = {
      firstName: userInfo.firstName,
      password: newUserDetails.password,
      userId: userInfo.id,
      hotelName: userInfo['hotel.name'],
      email: userInfo.email,
    };
    sendMail({
      to: action.details.email,
      htmlOptions,
    });
    const employees = await employee.fetchAll({ hotelId: action.hotelId });
    return handleSuccess(client, employees);
  } catch (error) {
    return handleFail(client, error);
  }
};
