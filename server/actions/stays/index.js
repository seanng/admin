/* eslint consistent-return:0 */

// POST /api/stays

// PUT /api/stays/:stayId

// GET /api/stays/:stayId

const getStay = (res, rej, req, params) => {
  console.log('we are in get', req.body, params);
  return res('get stay');
};

const postStay = (res, rej, req) => {
  console.log('we are in post', req.body, req);
  return res('post stay');
};

const putStay = (res, rej, req, params) => {
  console.log('we are in put', req.body, params);
  return res('put stay');
};

module.exports = (req, params) =>
  new Promise((res, rej) => {
    if (req.method === 'POST') {
      return postStay(res, rej, req, params);
    }
    if (req.method === 'GET') {
      return getStay(res, rej, req, params);
    }
    if (req.method === 'PUT') {
      return putStay(res, rej, req, params);
    }
  });
