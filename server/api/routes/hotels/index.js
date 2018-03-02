/* eslint consistent-return:0 */
const controller = require('./hotels.controller');
// POST /api/hotels

// PUT /api/hotels/:hotelId

// GET /api/hotels/:hotelId

module.exports = (req, params) =>
  new Promise((resolve, reject) => {
    if (req.method === 'GET') {
      return controller.getHotels(resolve, reject, req, params);
    }
  });
