const { Stay, Hotel, Customer } = require('../db/models');

const fetchActive = hotelId =>
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

const fetchHotelHistory = hotelId =>
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
    include: [Customer],
  });

const fetchCustomerHistory = customerId =>
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

module.exports = {
  fetchActive,
  fetchHotelHistory,
  fetchCustomerHistory,
};
