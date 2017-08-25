const { Employee } = require('../../db/config');
const { reply } = require('../helpers');

const setAdmin = (employeeId, respond) => {
  Employee.update(
    {
      adminLevel: 2,
    },
    {
      where: {
        id: employeeId,
      },
    }
  )
    .then(() => respond(null, employeeId))
    .catch(err => respond(err));
};

module.exports = (client, action) =>
  setAdmin(action.employeeId, (err, employeeId) => {
    if (err) {
      console.log('what is the err!?', err);
      return reply(client, {
        type: 'app/TeamManagement/SET_ADMIN_FAIL',
        err,
      });
    }
    return reply(client, {
      type: 'app/TeamManagement/SET_ADMIN_SUCCESS',
      employeeId,
    });
  });
