/* eslint consistent-return:0 */
const { Customer } = require('../../../db/models');
const { setCustomerSocketId } = require('../../../io/helpers');
const { signToken, validateToken } = require('../../../db/helpers');
const { fbRetrieveCustomer } = require('../../../services/customer');
const { getCustomerBookingStatus } = require('../../../services/stays');
const rp = require('request-promise');
const logger = require('../../../logger');
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
        return getCustomerBookingStatus(user.id).then(data => {
          setCustomerSocketId(user.id, socketId);
          return res({ ...data, token: signToken(user.id) });
        });
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
      return getCustomerBookingStatus(decoded.userId).then(data => {
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
    }
    logger.error('it aint decoded...', err, 'decoded : ', decoded);
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
  getFbUser(accessToken)
    .then(fbUser => {
      if (fbUser.id === facebookId) {
        return fbRetrieveCustomer(fbUser)
          .then(({ customer, newlyCreated }) => {
            setCustomerSocketId(customer.id, socketId);
            const token = signToken(customer.id);
            if (newlyCreated) {
              return res({ ...customer, token });
            }
            return getCustomerBookingStatus(customer.id)
              .then(data => {
                if (data) {
                  return res({ ...data, token });
                }
                return res({ ...customer, token });
              })
              .catch(rej);
          })
          .catch(error => console.log('wtf why is there an error??', error));
      }
      return rej(new Error('Invalid Access Token'));
    })
    .catch(error => logger.error('error in getFBuser!!', error));
};

module.exports = controller;
