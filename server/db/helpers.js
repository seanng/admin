const jwt = require('jsonwebtoken');
const { Stay, Customer } = require('./schema');
const secret = '19ajsadijmvz';

function retrieveStays(hotelId, respond) {
  Stay.findAll({
    where: { hotelId },
    include: [Customer],
  })
    .then(stays => {
      const newStays = stays.map(stay => ({
        bookingTime: stay.bookingTime,
        checkInTime: stay.checkInTime,
        checkOutTime: stay.checkOutTime,
        customerName: `${stay.customer.firstName} ${stay.customer.lastName}`,
        roomNumber: stay.roomNumber,
        totalCharge: stay.totalCharge,
      }));
      respond(null, newStays);
    })
    .catch(err => respond(err));
}

function signToken(id) {
  return jwt.sign({ userId: id }, secret, { expiresIn: 36000 });
}

function validateToken(token, cb) {
  return jwt.verify(token, secret, cb);
}

module.exports = {
  retrieveStays,
  signToken,
  validateToken,
};
