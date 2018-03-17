const { Employee } = require('../db/models');
const fetchOne = id => Employee.findOne({ where: { id } });

const fetchAll = hotelId =>
  Employee.findAll({
    where: { hotelId },
    attributes: {
      exclude: ['password', 'createdAt', 'regDate', 'updatedAt'],
    },
  });

const create = userDetails => Employee.create(userDetails);

const updateProfile = profile =>
  Employee.update(profile, {
    where: { id: profile.id },
    returning: true,
    plain: true,
    raw: true,
  }).then(data => data[1]);

module.exports = {
  fetchOne,
  fetchAll,
  create,
  updateProfile,
};
