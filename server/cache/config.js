const fakeRooms = require('./fakeData');
const Redis = require('ioredis');
const cache = new Redis(6379, '127.0.0.1');

// clear db and then create fake data.
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
module.exports = cache;
