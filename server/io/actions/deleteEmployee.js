const { Employee } = require('../../db/models');
const { reply } = require('../helpers');

const deleteEmployee = (employeeId, respond) => {
  Employee.destroy({
    where: { id: employeeId },
  })
    .then(() => respond(null, employeeId))
    .catch(err => respond(err));
};

module.exports = (client, action) =>
  deleteEmployee(action.employeeId, (err, employeeId) => {
    if (err) {
      console.log('what is the err!?', err);
      return reply(client, {
        type: 'app/TeamManagement/DELETE_EMPLOYEE_FAIL',
        err,
      });
    }
    return reply(client, {
      type: 'app/TeamManagement/DELETE_EMPLOYEE_SUCCESS',
      employeeId,
    });
  });
