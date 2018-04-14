const { Employee } = require('../../../db/models');
const { signToken } = require('../../../db/helpers');
const logger = require('../../../logger');

exports.createNewEmployee = async req => {
  try {
    const user = Employee.create(req.body);
    return { data: { token: signToken(user.id), user } };
  } catch (error) {
    return logger.error(error);
  }
};
