const roomBooking = require('../../../services/roomBooking');
const { getUserIdByReq } = require('../../../utils/helpers');

const controller = {};

controller.booked = (resolve, reject, req) => {
  getUserIdByReq(req).then(userId =>
    roomBooking.book(userId, req.body.hotelId)
  );
};

module.exports = controller;
