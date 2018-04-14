const { Stay } = require('../db/models');
const { payments } = require('./index');

exports.create = (hotelId, roomNumber) =>
  Stay.create({
    hotelId,
    roomNumber,
    status: 'AVAILABLE',
  });

exports.remove = id => Stay.destroy({ where: { id } });

exports.book = async (customerId, hotel) => {
  const updatedParams = {
    status: 'BOOKED',
    customerId,
    costMinCharge: hotel.costMinCharge,
    costPerHour: hotel.costPerHour,
    costPerMinute: hotel.costPerMinute,
    bookingTime: new Date().getTime(),
  };
  const stay = await Stay.findOneByHotelId(hotel.id);
  if (stay === null) {
    throw new Error('no stay is available for this hotel');
  }
  await Stay.update(updatedParams, {
    where: { id: stay.id },
  });
  return { ...stay, ...updatedParams };
};

exports.checkIn = id => Stay.checkIn(id);

exports.checkOut = async (customerId, stayId) => {
  const checkOutTime = new Date().getTime();
  const stayInfo = await Stay.getDetailsForCheckOut(stayId);
  const roomCharge = payments.computeRoomCharge({
    checkOutTime,
    checkInTime: stayInfo.checkInTime,
    costPerHour: stayInfo.costPerHour,
    costPerMinute: stayInfo.costPerMinute,
    costMinCharge: stayInfo.costMinCharge,
  });
  await payments.chargeCustomer(
    stayInfo['customer.stripeId'],
    stayInfo['hotel.stripeId'],
    roomCharge
  );
  return Stay.checkOut({ id: stayId, customerId, roomCharge, checkOutTime });
};

exports.cancel = async (id, customerId) =>
  await Stay.cancelBooking(id, customerId);
