const controller = require('./controller');
/* eslint consistent-return:0 */

// PUT /api/profile

module.exports = req => {
  if (req.method === 'PUT') {
    return controller.update(req);
  }
};
