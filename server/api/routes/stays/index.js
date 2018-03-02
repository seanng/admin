/* eslint consistent-return:0 */
const controller = require('./controller');
// POST /api/hotels

// PUT /api/hotels/:hotelId

// GET /api/hotels/:hotelId

module.exports = (req, params) =>
  new Promise((resolve, reject) => {
    if (req.method === 'PUT') {
      if (req.body.action === 'createBooking') {
        return controller.createBooking(resolve, reject, req, params);
      }
    }
  });
