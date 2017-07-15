/* eslint consistent-return:0 */
const Customer = require('../customer/customer.model');

const { signToken, validateToken } = require('../../db/helpers');
const controller = {};

controller.postAuth = (res, rej, req) => {
  const { email, password } = req.body;

  return Customer.findOne({ where: { email } }).then(user =>
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return res({ data: { error: 'DB error' } });
      } else if (isMatch) {
        return res({ data: { token: signToken(user.id), user } });
      }
      return res({ data: { error: 'Invalid password' } });
    }),
  );
};

controller.validateToken = function validate(res, rej, req) {
  const { token } = req.body;
  validateToken(token, (err, decoded) => {
    if (err) {
      return res({ data: { error: 'Decoding token error' } });
    } else if (decoded) {
      return Customer.findOne({ where: { id: decoded.userId } }).then(user => {
        if (user) {
          res({ data: { token, user } });
        } else {
          res({ error: 'User does not exist' });
        }
      });
    }
  });
};

module.exports = controller;
