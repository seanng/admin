// const Employee = require('../../actions/employee/employee.model');
const { Employee } = require('../../db/models');
const { reply } = require('../helpers');
const { generatePassword, generateEmailHtml } = require('../../utils/helpers');
const sendMail = require('../../utils/sendMail');

const addEmployee = (
  { firstName, lastName, email, contactNumber, photo },
  hotelId,
  inviterId,
  respond
) => {
  const password = generatePassword();
  return Employee.create({
    firstName,
    lastName,
    email,
    hotelId,
    inviterId,
    password,
  })
    .then(() => Employee.findAll({ where: { hotelId } }))
    .then(employees =>
      respond(null, employees, { firstName, lastName, password, email })
    )
    .catch(err => respond(err));
};

module.exports = (client, action) =>
  addEmployee(
    action.details,
    action.hotelId,
    action.userId,
    (err, employees, newUserDetails) => {
      if (err) {
        return reply(client, {
          type: 'app/TeamManagement/ADD_EMPLOYEE_FAIL',
          err,
        });
      }
      const html = generateEmailHtml(newUserDetails);
      sendMail({
        to: action.details.email,
        html,
      });
      return reply(client, {
        type: 'app/TeamManagement/ADD_EMPLOYEE_SUCCESS',
        employees,
      });
    }
  );
