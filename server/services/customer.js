const { Customer } = require('../db/models');

exports.updateProfile = profile =>
  Customer.update(profile, {
    where: { id: profile.id },
    returning: true,
    plain: true,
    raw: true,
  }).then(data => data[1]);

exports.fbRetrieveCustomer = fbUser =>
  Customer.findOrCreate({
    where: { email: fbUser.email },
    returning: true,
    plain: true,
    raw: true,
    defaults: {
      firstName: fbUser.first_name,
      lastName: fbUser.last_name,
      email: fbUser.email,
      facebookId: fbUser.id,
    },
  }).then(data => {
    const { id, firstName, lastName, email, phoneNumber, avatarUrl } = data[0];
    return {
      customer: { id, firstName, lastName, email, phoneNumber, avatarUrl },
      newlyCreated: data[1],
    };
  });
