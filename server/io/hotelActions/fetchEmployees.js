const employee = require('../../services/employee');
const { reply } = require('../helpers');

module.exports = (client, action) =>
  new Promise((resolve, reject) => {
    employee
      .fetchAll(action.hotelId)
      .then(employees =>
        resolve(
          reply(client, {
            type: 'app/TeamManagement/FETCH_EMPLOYEES_SUCCESS',
            employees,
          })
        )
      )
      .catch(err =>
        reject(
          reply(client, {
            type: 'app/TeamManagement/FETCH_EMPLOYEES_ERROR',
            err,
          })
        )
      );
  });
