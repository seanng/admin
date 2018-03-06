const { Employee } = require('../db/models');
const fetchOne = id => Employee.findOne({ where: { id } });

const fetchAll = hotelId =>
  Employee.findAll({
    where: { hotelId },
    attributes: { exclude: ['password', 'createdAt', 'regDate', 'updatedAt'] },
  });

const create = userDetails => Employee.create(userDetails);

module.exports = {
  fetchOne,
  fetchAll,
  create,
};
