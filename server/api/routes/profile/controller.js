const Customer = require('../../../db/models/Customer');
const { validateToken } = require('../../../db/helpers');
const controller = {};

controller.update = (resolve, reject, req) => {
  const jwtToken = req.header('Authorization');
  validateToken(jwtToken, (err, customer) => {
    if (err) {
      return reject('FUck you.hacker');
    }
    return Customer.update(req.body.profile, {
      where: { id: customer.userId },
    }).then(() => resolve({ profile: req.body.profile }));
  });
};

module.exports = controller;
