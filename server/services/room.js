const { Stay, Hotel } = require('../db/models');

const create = (hotelId, roomNumber) =>
  Stay.create({
    hotelId,
    roomNumber,
    status: 'AVAILABLE',
  });

const remove = id => Stay.destroy({ where: { id } });

const book = (customerId, hotelId) => {
  let result;
  const updatedParams = {
    status: 'BOOKED',
    customerId,
    bookingTime: new Date().getTime(),
  };
  return Stay.findOne({
    raw: true,
    where: {
      hotelId,
      status: 'AVAILABLE',
    },
    include: [
      {
        model: Hotel,
      },
    ],
  })
    .then(stay => {
      if (stay === null) {
        throw new Error('no stay is available for this hotel');
      }
      result = stay;
      return Stay.update(updatedParams, {
        where: { id: stay.id },
      });
    })
    .then(() => ({ ...result, ...updatedParams }));
};

const checkIn = id =>
  Stay.update(
    {
      status: 'CHECKED_IN',
      checkInTime: new Date().getTime(),
    },
    {
      attributes: ['checkInTime', 'status', 'id'],
      where: { id },
      returning: true,
      plain: true,
      raw: true,
    }
  );

const checkOut = (id, customerId) =>
  Stay.update(
    {
      status: 'CHECKED_OUT',
      checkOutTime: new Date().getTime(),
    },
    {
      attributes: [
        'bookingTime',
        'checkInTime',
        'roomCharge',
        'roomNumber',
        'totalCharge',
        'costCurrency',
        'checkOutTime',
        'status',
        'id',
      ],
      where: { id, customerId },
      returning: true,
      plain: true,
      raw: true,
    }
  );

const cancel = (id, customerId) =>
  Stay.update(
    {
      status: 'AVAILABLE',
      bookingTime: null,
      customerId: null,
    },
    {
      where: {
        id,
        customerId,
      },
    }
  );

module.exports = {
  create,
  book,
  checkIn,
  checkOut,
  cancel,
  remove,
};
