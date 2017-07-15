/* eslint consistent-return:0 */
const controller = require('./auth.controller');

module.exports = (req, params) =>
  new Promise((res, rej) => {
    console.log('req.Url: ', req.url);
    console.log(req.url.search('validateToken'));
    if (req.method === 'POST' && req.url.search('validateToken') > -1) {
      console.log('validateToken');
      return controller.validateToken(res, rej, req, params);
    }

    if (req.method === 'POST')
      return controller.postAuth(res, rej, req, params);
  });
