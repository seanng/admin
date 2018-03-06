const { reply } = require('../helpers');
const { generatePassword, generateEmailHtml } = require('../../utils/helpers');
const sendMail = require('../../utils/sendMail');
const employee = require('../../services/employee');

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
      .then(() => employee.fetchAll(action.hotelId))
      .then(employees => {
        const html = generateEmailHtml(newUserDetails);
        sendMail({
          to: action.details.email,
          html,
        });
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
