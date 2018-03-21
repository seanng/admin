const { Customer } = require('../db/models');

const updateProfile = profile =>
  Customer.update(profile, {
    where: { id: profile.id },
    returning: true,
    plain: true,
    raw: true,
  }).then(data => data[1]);

module.exports = {
  updateProfile,
};
