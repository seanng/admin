const R = require('ramda');
const Promise = require('bluebird');
const { Hotel } = require('../../../db/models');
const { getHotelAvailability } = require('../../../services/hotelAvailability');
const controller = {};

controller.getHotels = resolve =>
  Hotel.findAll({
    attributes: { exclude: [] },
    raw: true,
  }).then(hotels => {
    const hotelsAvailabilityPromise = Promise.map(
      R.map(R.prop('id'), hotels),
      getHotelAvailability
    );
    hotelsAvailabilityPromise.then(hotelsAvailability => {
      const hotelsWithAvailablity = R.zipWith(
        (hotel, isAvailable) => Object.assign(hotel, { isAvailable }),
        hotels,
        hotelsAvailability
      );
      resolve({ hotels: hotelsWithAvailablity });
    });
  });

module.exports = controller;
