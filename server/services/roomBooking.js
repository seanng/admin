const { Stay, Hotel } = require('../db/models');

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
      include: [
        {
          model: Hotel,
        },
      ],
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
const cancel = (customerId, stayId) =>
  new Promise((resolve, reject) => {
    const params = {
      status: 'AVAILABLE',
      bookingTime: null,
      customerId: null,
    };
    Stay.update(params, {
      where: {
        id: stayId,
        customerId,
      },
    })
      .then(result => {
        console.log('upon cancelling? ', result);
        resolve(stayId);
      })
      .catch(error => {
        console.log('error in cancel ', error);
        reject(error);
      });
  });

module.exports = {
  book,
  checkin,
  checkout,
  cancel,
};
