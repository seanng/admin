const { reply } = require('../helpers');
const { generatePassword } = require('../../utils/helpers');
const { employee, sendMail } = require('../../services');

module.exports = (client, action) =>
  new Promise((resolve, reject) => {
    const newUserDetails = {
      ...action.details,
      password: generatePassword(),
      inviterId: action.userId,
      hotelId: action.hotelId,
    };
    employee
      .create(newUserDetails)
      .then(userInfo => {
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
      })
      .then(() => employee.fetchAll(action.hotelId))
      .then(employees => {
        resolve(
          reply(client, {
            type: 'app/TeamManagement/ADD_EMPLOYEE_SUCCESS',
            employees,
          })
        );
      })
      .catch(err =>
        reject(
          reply(client, {
            type: 'app/TeamManagement/ADD_EMPLOYEE_FAIL',
            err,
          })
        )
      );
  });
