const { Customer } = require('../../db/models');
const { signToken } = require('../../db/helpers');

exports.createNewCustomer = async req => {
  const customer = await Customer.create({ ...req.body });
  return { data: { token: signToken(customer.Id), user: customer } };
};
