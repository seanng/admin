const jwt = require('jsonwebtoken');
const { Stay, Customer } = require('./config');
const secret = '19ajsadijmvz';

const retrieveStays = (hotelId, respond) => {
  Stay.findAll({
    where: { hotelId },
    include: [Customer],
  })
    .then(stays => {
      console.log('mamama stays', stays);
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
};

const signToken = function signToken(id) {
  return jwt.sign({ userId: id }, secret, { expiresIn: 36000 });
};

const validateToken = function validateToken(token, cb) {
  return jwt.verify(token, secret, cb);
};

module.exports = {
  retrieveStays,
  signToken,
  validateToken,
};
