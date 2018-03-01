/* eslint consistent-return:0 */
const controller = require('./auth.controller');

module.exports = (req, params) =>
  new Promise((resolve, reject) => {
    if (req.method === 'POST') {
      if (req.url === '/auth/verify_token') {
        return controller.validateToken(resolve, reject, req, params);
      }
      return controller.postAuth(resolve, reject, req, params);
    }
  });
