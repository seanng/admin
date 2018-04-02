const R = require('ramda');
const Promise = require('bluebird');
const { Hotel } = require('../../../db/models');
const { getHotelAvailability } = require('../../../services/hotelAvailability');

exports.getHotels = () =>
  Hotel.findAll({
    attributes: { exclude: [] },
    raw: true,
  }).then(hotels => {
    const hotelsAvailabilityPromise = Promise.map(
      R.map(R.prop('id'), hotels),
      getHotelAvailability
    );
    return hotelsAvailabilityPromise.then(hotelsAvailability => {
      const hotelsWithAvailablity = R.zipWith(
        (hotel, isAvailable) => Object.assign(hotel, { isAvailable }),
        hotels,
        hotelsAvailability
      );
      return { hotels: hotelsWithAvailablity };
    });
  });

exports.createHotel = req => Hotel.create(req.body);
