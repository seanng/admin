const Customer = require('./customer.model');
const { signToken } = require('../../db/helpers');
const controller = {};

controller.createNewCustomer = (res, rej, req) => {
  const { username, password, firstName, lastName, email, phoneNo } = req.body;

  return Customer.create({
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

// controller.getCustomer = (res, rej, req) => {};

// controller.putCustomer = (res, rej, req) => {};

module.exports = controller;
