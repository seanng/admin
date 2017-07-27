const cache = require('./config');

const fakeRooms = [
  {
    hotelId: 1,
    roomNumber: '2046',
    status: 'Available',
  },
  {
    hotelId: 1,
    customerId: 1,
    roomNumber: '2030',
    customerName: 'Kim Il Sung',
    status: 'Reserved',
    bookingTime: 1489381804189,
  },
  {
    hotelId: 1,
    roomNumber: '3901',
    customerId: 32,
    customerName: 'Carmen Taubman',
    status: 'Occupied',
    bookingTime: 1489381804189,
    checkInTime: 1489381904189,
  },
  {
    hotelId: 1,
    roomNumber: '12031',
    customerId: 392,
    customerName: 'Michael Wong',
    status: 'Not Ready',
    bookingTime: 1489381404189,
    checkInTime: 1489381704189,
    checkOutTime: 1489381904189,
  },
];

module.exports = () =>
  cache.flushdb().then(() => {
    console.log('inserting into cache');
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
