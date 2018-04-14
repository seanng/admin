const { Stay, Hotel } = require('../db/models');
const { customer, hotel, payments } = require('./index');

exports.create = (hotelId, roomNumber) =>
  Stay.create({
    hotelId,
    roomNumber,
    status: 'AVAILABLE',
  });

exports.remove = id => Stay.destroy({ where: { id } });

exports.book = (customerId, hotelId) => {
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

exports.checkIn = id =>
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

exports.checkOut = async ({
  customerId,
  hotelId,
  stayId,
  checkInTime,
  costPerHour,
  costPerMinute,
  costMinCharge,
}) => {
  const checkOutTime = new Date().getTime();
  const customerInfo = await customer.fetchOne(customerId);
  const hotelInfo = await hotel.fetchOne(hotelId);
  const roomCharge = payments.computeRoomCharge({
    checkInTime,
    checkOutTime,
    costPerHour,
    costPerMinute,
    costMinCharge,
  });
  await payments.chargeCustomer(
    customerInfo.stripeId,
    hotelInfo.stripeAccount,
    roomCharge
  );
  return Stay.update(
    {
      status: 'CHECKED_OUT',
      checkOutTime: new Date().getTime(),
      roomCharge,
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
      where: { id: stayId, customerId },
      returning: true,
      plain: true,
      raw: true,
    }
  );
};

exports.cancel = (id, customerId) =>
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
