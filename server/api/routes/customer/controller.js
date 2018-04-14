const { Customer } = require('../../../db/models');
const { signToken } = require('../../../db/helpers');
const logger = require('../../../logger');

exports.createNewCustomer = async req => {
  try {
    const customer = await Customer.create({ ...req.body });
    return { data: { token: signToken(customer.Id), user: customer } };
  } catch (error) {
    return logger.error(error);
  }
};
