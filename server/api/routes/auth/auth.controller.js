/* eslint consistent-return:0 */
const { Customer } = require('../../../db/models');
const { signToken, validateToken } = require('../../../db/helpers');
const rp = require('request-promise');
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
          // TO DO: move addsocket to ON BOOKING ACTION instead of login/checked auth.
          // TO DO: check if any stay with customerId is 'BOOKED' or 'CHECKED_IN'
          res({ token, user });
        } else {
          res({ error: 'User does not exist' });
        }
      });
    }
  });
};

const getFbUser = accessToken => {
  const options = {
    uri: 'https://graph.facebook.com/v2.8/me',
    qs: {
      access_token: accessToken,
      fields: 'id,email,first_name,last_name',
    },
    headers: {
      'User-Agent': 'Request-Promise',
    },
    json: true, // Automatically parses the JSON string in the response
  };
  return rp(options);
};

controller.facebook_authenticate = function facebookAuthenticate(
  res,
  rej,
  req
) {
  getFbUser(req.body.accessToken).then(fbUser => {
    if (fbUser.id === req.body.facebookId) {
      Customer.findOne({ where: { facebookId: fbUser.id } })
        .then(customer => {
          if (customer === null) {
            Customer.create({
              firstName: fbUser.first_name,
              lastName: fbUser.last_name,
              email: fbUser.email,
              facebookId: fbUser.id,
            }).then(newCustomer =>
              res({ token: signToken(newCustomer.id), user: newCustomer })
            );
          } else {
            res({ token: signToken(customer.id), user: customer });
          }
        })
        .catch(rej);
    } else {
      rej(new Error('Invalid Access Token'));
    }
  });
};

module.exports = controller;
