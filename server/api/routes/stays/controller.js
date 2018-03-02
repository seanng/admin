const roomBooking = require('../../../services/roomBooking');
const { getUserIdByReq } = require('../../../utils/helpers');

const controller = {};

controller.createBooking = (resolve, reject, req) => {
  getUserIdByReq(req)
    .then(userId =>
      roomBooking
        .book(userId, req.body.hotelId)
        .then(booking => resolve({ booking }))
    )
    .catch(e => {
      console.log('e; ', e);
      reject(e);
    });
};

module.exports = controller;
