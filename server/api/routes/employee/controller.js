const { Employee } = require('../../../db/models');
const { signToken } = require('../../../db/helpers');
const controller = {};

controller.createNewEmployee = (res, rej, req) => {
  const { username, password, firstName, lastName, email, phoneNo } = req.body;

  return Employee.create({
    username,
    password,
    firstName,
    lastName,
    email,
    phoneNo,
  })
    .then(user => ({ token: signToken(user.id), user }))
    .then(data => res({ data }));
};

// controller.getEmployee = (res, rej, req) => {};

// controller.putEmployee = (res, rej, req) => {};

module.exports = controller;
