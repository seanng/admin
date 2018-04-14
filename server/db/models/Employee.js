const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');
const { Employee, Hotel } = require('../schema');
const cipher = Promise.promisify(bcrypt.hash);
const compare = Promise.promisify(bcrypt.compare);

Employee.beforeBulkCreate(async users => {
  // eslint-disable-next-line
  for (const user of users) {
    const hashedPw = await cipher(user.password, null, null);
    user.password = hashedPw;
  }
});

Employee.beforeCreate(user =>
  cipher(user.password, null, null).then(hashedPw => {
    // eslint-disable-next-line no-param-reassign
    user.password = hashedPw;
  })
);

Employee.Instance.prototype.comparePassword = function(candidatePassword) {
  return compare(candidatePassword, this.getDataValue('password'));
};

Employee.fetchOne = params => Employee.findOne({ where: params });

Employee.fetchAll = queryParams =>
  Employee.findAll({
    where: queryParams,
    attributes: {
      exclude: ['password', 'createdAt', 'regDate', 'updatedAt'],
    },
  });

Employee.delete = params => Employee.destroy({ where: params });

Employee.createInitial = userDetails =>
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

Employee.updateProfile = profile =>
  Employee.update(profile, {
    where: { id: profile.id },
    returning: true,
    plain: true,
    raw: true,
  }).then(data => data[1]);

Employee.setAdmin = id =>
  Employee.update(
    {
      adminLevel: 2,
    },
    {
      where: {
        id,
      },
    }
  );

module.exports = Employee;
