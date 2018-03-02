/* eslint consistent-return:0 */
const { Customer } = require('../../../db/models');
const { signToken, validateToken } = require('../../../db/helpers');
const controller = {};

controller.postAuth = (res, rej, req) => {
  const { password } = req.body;
  let { email } = req.body;
  email = email.toLowerCase();

  return Customer.findOne({ where: { email } }).then(user =>
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return rej({ error: 'DB error' });
      } else if (isMatch) {
        return res({ token: signToken(user.id), user });
      }
      return rej({ error: 'Invalid password' });
    })
  );
};

controller.validateToken = function validate(res, rej, req) {
  const { token } = req.body;
  validateToken(token, (err, decoded) => {
    if (err) {
      return rej({ error: 'Decoding token error' });
    } else if (decoded) {
      return Customer.findOne({ where: { id: decoded.userId } }).then(user => {
        if (user) {
          res({ token, user });
        } else {
          res({ error: 'User does not exist' });
        }
      });
    }
  });
};

module.exports = controller;
