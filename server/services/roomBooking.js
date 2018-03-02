const Stay = require('../db/models/Stay');
const book = (userId, hotelId) => {
  const updateParams = {
    status: 'BOOKED',
    customerId: userId,
    bookingTime: new Date(),
  };
  let stay;
  return new Promise((resolve, reject) => {
    Stay.findOne({ raw: true, where: { hotelId, status: 'AVAILABLE' } })
      .then(stay_ => {
        if (stay_ === null) {
          return reject(new Error('no stay is available for this hotel'));
        }
        stay = stay_;
        return Stay.update(updateParams, {
          where: { id: stay_.id },
        });
      })
      .then(() => resolve({ ...stay, ...updateParams }))
      .catch(reject);
  });
};

const checkin = () => {};
const checkout = () => {};
const cancel = () => {};

module.exports = {
  book,
  checkin,
  checkout,
  cancel,
};
