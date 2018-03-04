const jwt = require('jsonwebtoken');
const { Stay, Customer, Hotel } = require('./schema');
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

function getCustomerBookingStatus(customerId) {
  return new Promise((resolve, reject) =>
    Stay.findAll({
      attributes: [
        'id',
        'status',
        'bookingTime',
        'checkInTime',
        'roomNumber',
        'roomType',
      ],
      raw: true,
      where: {
        customerId,
        status: {
          $or: ['BOOKED', 'CHECKED_IN'],
        },
      },
      include: [
        {
          model: Customer,
          attributes: { exclude: ['password'] },
        },
        {
          model: Hotel,
        },
      ],
    })
      .then(data => resolve(data[0]))
      .catch(error => reject(error))
  );
}

function signToken(id) {
  return jwt.sign({ userId: id }, secret, { expiresIn: 94608000 });
}

function validateToken(token, cb) {
  return jwt.verify(token, secret, cb);
}

function parseToken(token) {
  return jwt.decode(token);
}

module.exports = {
  retrieveStays,
  getCustomerBookingStatus,
  signToken,
  validateToken,
  parseToken,
};
