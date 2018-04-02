/* eslint consistent-return:0 */
const controller = require('./controller');
// POST /api/hotels

// PUT /api/hotels/:hotelId

// GET /api/hotels/:hotelId

module.exports = (req, params) => {
  if (req.method === 'POST') {
    return controller.createHotel(req, params);
  }

  if (req.method === 'GET') {
    return controller.getHotels(req, params);
  }
};
