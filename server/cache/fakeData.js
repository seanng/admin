const cache = require('./index');

const fakeRooms = [
  {
    hotelId: 1,
    roomNumber: '2046',
    status: 'available',
  },
  {
    hotelId: 1,
    customerId: 1,
    roomNumber: '2030',
    customerName: 'Kim Il Sung',
    status: 'reserved',
    bookingTime: 1489381804189,
  },
  {
    hotelId: 1,
    roomNumber: '3901',
    customerId: 32,
    customerName: 'Carmen Taubman',
    status: 'occupied',
    bookingTime: 1489381804189,
    checkInTime: 1489381904189,
  },
  {
    hotelId: 1,
    roomNumber: '12031',
    customerId: 392,
    customerName: 'Michael Wong',
    status: 'notReady',
    bookingTime: 1489381404189,
    checkInTime: 1489381704189,
    checkOutTime: 1489381904189,
  },
];

module.exports = () =>
  cache.flushdb().then(() => {
    fakeRooms.forEach(room => {
      cache.sadd(`${room.hotelId}:available`, room.roomNumber);
      const key = `${room.hotelId}:room:${room.roomNumber}`;
      Object.keys(room).forEach(k => {
        if (k !== 'hotelId' && k !== 'roomNumber') {
          cache.hset(key, k, room[k]);
        }
      });
    });
  });
