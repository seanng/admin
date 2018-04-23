const { Stay } = require('../../db/models');
const { validateToken } = require('../../db/helpers');
const room = require('../../services/room');

const createBooking = async req => {
  const { userId } = validateToken(req.body.token);
  return await room.book(userId, req.body.hotel);
};

const checkin = req => Stay.checkIn(req.params.id);

const checkout = req => room.checkOut(req.params.id);

const cancel = req => Stay.cancel(req.params.id);

exports.createRoom = async req =>
  await room.create(req.body.hotelId, req.body.roomNumber);

exports.deleteRoom = async req =>
  await Stay.destroy({ where: { id: req.params.id } });

exports.fetchByCustomerId = req => {
  const { userId } = validateToken(req.params.token);
  return Stay.fetchCustomerHistory(userId);
};

exports.fetchByHotelId = req => {
  const dictionary = {
    active: hotelId => Stay.fetchActive(hotelId),
    past: hotelId => Stay.fetchHotelHistory(hotelId),
  };
  return dictionary[req.body.filter](req.params.id);
};

exports.updateBooking = req => {
  if (!req.params.id) {
    return createBooking(req);
  }
  const dictionary = {
    checkin,
    cancel,
    checkout,
  };
  return dictionary[req.body.action](req);
};
