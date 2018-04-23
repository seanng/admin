const { Stay } = require('../../db/models');
const io = require('../../io');
const room = require('../../services/room');
const { getUserIdByReq } = require('../../utils/helpers');
const { emitToHotel, setCustomerSocketId } = require('../../io/helpers');

exports.createRoom = async req =>
  await room.create(req.body.hotelId, req.body.roomNumber);

exports.deleteRoom = async req =>
  await Stay.destroy({ where: { id: req.params.id } });

exports.createBooking = (req, res) => {
  getUserIdByReq(req).then(userId =>
    room.book(userId, req.body.hotelId).then(booking => {
      setCustomerSocketId(userId, req.body.socketId);
      emitToHotel(io, req.body.hotelId, {
        type: 'app/FrontDesk/SOCKET_CREATE_BOOKING',
        booking,
      });
      return res(booking);
    })
  );
};

exports.fetchByHotelId = req => {
  const dictionary = {
    active: hotelId => Stay.fetchActive(hotelId),
    past: hotelId => Stay.fetchHotelHistory(hotelId),
  };
  return dictionary[req.body.filter](req.params.id);
};

exports.checkIn = async req => await Stay.checkIn(req.params.id);
