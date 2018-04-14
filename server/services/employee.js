const { Employee, Hotel } = require('../db/models');

exports.fetchOne = queryParams => Employee.findOne({ where: queryParams });

exports.fetchAll = queryParams =>
  Employee.findAll({
    where: queryParams,
    attributes: {
      exclude: ['password', 'createdAt', 'regDate', 'updatedAt'],
    },
  });

exports.create = userDetails =>
  Employee.create(userDetails, {
    attributes: {
      exclude: ['password'],
    },
    include: [
      {
        model: Hotel,
        attributes: ['name'],
      },
    ],
  });

exports.updateProfile = profile =>
  Employee.update(profile, {
    where: { id: profile.id },
    returning: true,
    plain: true,
    raw: true,
  }).then(data => data[1]);

exports.delete = queryParams => Employee.destroy({ where: queryParams });
