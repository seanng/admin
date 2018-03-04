/* eslint consistent-return:0 */
const { Customer } = require('../../../db/models');
const { setCustomerSocketId } = require('../../../io/helpers');
const {
  signToken,
  validateToken,
  getCustomerBookingStatus,
} = require('../../../db/helpers');
const rp = require('request-promise');
const controller = {};

controller.postAuth = (res, rej, req) => {
  const { password, socketId } = req.body;
  let { email } = req.body;
  email = email.toLowerCase();

  return Customer.findOne({ where: { email } }).then(user =>
    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return rej({ error: 'DB error' });
      } else if (isMatch) {
        setCustomerSocketId(user.id, socketId);
        return res({ token: signToken(user.id), user });
      }
      return rej('Invalid password');
    })
  );
};

controller.validateToken = function validate(res, rej, req) {
  const { token, socketId } = req.body;
  validateToken(token, (err, decoded) => {
    if (err) {
      return rej({ error: 'Decoding token error' });
    } else if (decoded) {
      getCustomerBookingStatus(decoded.userId).then(data => {
        setCustomerSocketId(decoded.userId, socketId);
        if (data) {
          return res(data);
        }
        return Customer.findOne({
          where: {
            id: decoded.userId,
          },
        }).then(user => {
          if (user) {
            res(user);
          } else {
            rej('User does not exist!@! ');
          }
        });
      });
    } else {
      console.log('it aint decoded...', err, 'decoded : ', decoded);
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
  const { accessToken, facebookId, socketId } = req.body;
  getFbUser(accessToken).then(fbUser => {
    if (fbUser.id === facebookId) {
      Customer.findOne({ where: { facebookId: fbUser.id } })
        .then(customer => {
          if (customer === null) {
            Customer.create({
              firstName: fbUser.first_name,
              lastName: fbUser.last_name,
              email: fbUser.email,
              facebookId: fbUser.id,
            }).then(newCustomer => {
              setCustomerSocketId(newCustomer.id, socketId);
              return res({
                token: signToken(newCustomer.id),
                user: newCustomer,
              });
            });
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
