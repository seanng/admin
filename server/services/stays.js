const { Stay, Hotel, Customer, Surcharge } = require('../db/models');

exports.fetchCharges = queryParams => Surcharge.findAll({ where: queryParams });

exports.fetchActive = hotelId =>
  Stay.findAll({
    attributes: [
      'id',
      'customerId',
      'status',
      'bookingTime',
      'checkInTime',
      'roomNumber',
    ],
    where: {
      hotelId,
      status: {
        $or: ['AVAILABLE', 'BOOKED', 'CHECKED_IN'],
      },
    },
    include: [
      {
        model: Customer,
        attributes: ['firstName', 'lastName'],
      },
    ],
  });

exports.fetchHotelHistory = hotelId =>
  Stay.findAll({
    attributes: [
      'id',
      'bookingTime',
      'checkInTime',
      'checkOutTime',
      'roomNumber',
      'roomCharge',
      'totalCharge',
    ],
    where: {
      hotelId,
      status: 'CHECKED_OUT',
    },
    include: [Customer, Hotel],
  });

exports.fetchCustomerHistory = customerId =>
  Stay.findAll({
    attributes: [
      'id',
      'bookingTime',
      'checkInTime',
      'checkOutTime',
      'roomNumber',
      'roomCharge',
      'totalCharge',
      'roomType',
    ],
    where: {
      customerId,
      status: 'CHECKED_OUT',
    },
    include: [Hotel],
  });

exports.getCustomerBookingStatus = customerId =>
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
    .then(data => data[0])
    .catch(error => error);
