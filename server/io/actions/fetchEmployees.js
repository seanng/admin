const { Employee } = require('../../db/models');
const { reply } = require('../helpers');

const fetchEmployees = (hotelId, respond) => {
  Employee.findAll({
    where: { hotelId },
    attributes: { exclude: ['password', 'createdAt', 'regDate', 'updatedAt'] },
  })
    .then(employees => {
      respond(null, employees);
    })
    .catch(err => respond(err));
};

module.exports = (client, action) =>
  fetchEmployees(action.hotelId, (err, employees) => {
    if (err) {
      return reply(client, {
        type: 'app/TeamManagement/FETCH_EMPLOYEES_ERROR',
        err,
      });
    }
    return reply(client, {
      type: 'app/TeamManagement/FETCH_EMPLOYEES_SUCCESS',
      employees,
    });
  });
