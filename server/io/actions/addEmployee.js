const { Employee } = require('../../db/config');
const { reply } = require('../helpers');
const sendMail = require('../../utils/sendMail');

const addEmployee = (
  { firstName, lastName, email },
  hotelId,
  inviterId,
  respond
) =>
  Employee.create({ firstName, lastName, email, hotelId, inviterId })
    .then(() => Employee.findAll({ where: { hotelId } }))
    .then(employees => respond(null, employees))
    .catch(err => respond(err));

module.exports = (client, action) =>
  addEmployee(
    action.details,
    action.hotelId,
    action.userId,
    (err, employees) => {
      if (err) {
        return reply(client, {
          type: 'app/TeamManagement/ADD_EMPLOYEE_FAIL',
          err,
        });
      }
      sendMail({
        to: action.details.email,
      });
      return reply(client, {
        type: 'app/TeamManagement/ADD_EMPLOYEE_SUCCESS',
        employees,
      });
    }
  );
