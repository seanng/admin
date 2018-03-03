const { reply } = require('../helpers');
const { removeSocket } = require('../directory');

module.exports = client =>
  removeSocket(client.id, err => {
    if (err) {
      return;
    }
    reply(client, {
      type: 'app/app/EMPLOYEE_LOGOUT_SUCCESS',
    });
  });
