const roomBooking = require('../../../services/roomBooking');
const { getUserIdByReq } = require('../../../utils/helpers');
const { emitToHotel, setCustomerSocketId } = require('../../../io/helpers');

function createBooking(resolve, reject, req) {
  getUserIdByReq(req)
    .then(userId =>
      roomBooking.book(userId, req.body.hotelId).then(booking => {
        setCustomerSocketId(userId, req.body.socketId);
        emitToHotel(req.body.hotelId, {
          type: 'app/FrontDesk/SOCKET_CREATE_BOOKING',
          booking,
        });
        return resolve({ booking });
      })
    )
    .catch(e => reject(e));
}

module.exports = {
  createBooking,
};
