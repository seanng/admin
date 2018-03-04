const Stay = require('../db/models/Stay');

const book = (customerId, hotelId) =>
  new Promise((resolve, reject) => {
    let result;
    const updatedParams = {
      status: 'BOOKED',
      customerId,
      bookingTime: new Date().getTime(),
    };
    Stay.findOne({
      raw: true,
      where: {
        hotelId,
        status: 'AVAILABLE',
      },
    })
      .then(stay => {
        if (stay === null) {
          return reject(new Error('no stay is available for this hotel'));
        }
        result = stay;
        return Stay.update(updatedParams, {
          where: { id: stay.id },
        });
      })
      .then(() => resolve({ ...result, ...updatedParams }))
      .catch(reject);
  });

const checkin = () => {};
const checkout = () => {};
const cancel = () => {};

module.exports = {
  book,
  checkin,
  checkout,
  cancel,
};
