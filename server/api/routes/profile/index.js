const controller = require('./controller');
/* eslint consistent-return:0 */

// PUT /api/profile

module.exports = (req, params) =>
  new Promise((resolve, reject) => {
    if (req.method === 'PUT') {
      return controller.update(resolve, reject, req, params);
    }
  });
