/* eslint consistent-return:0 */

// POST /api/stays

// PUT /api/stays/:stayId

// GET /api/stays/:stayId

const getStay = res => res('get stay');

const postStay = res => res('post stay');

const putStay = res => res('put stay');

module.exports = (req, params) =>
  new Promise((resolve, reject) => {
    if (req.method === 'POST') {
      return postStay(resolve, reject, req, params);
    }
    if (req.method === 'GET') {
      return getStay(resolve, reject, req, params);
    }
    if (req.method === 'PUT') {
      return putStay(resolve, reject, req, params);
    }
  });
