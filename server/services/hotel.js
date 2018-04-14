const { Hotel, Stay } = require('../db/models');

exports.fetchAll = () =>
  Hotel.findAll({
    attributes: { exclude: [] },
    raw: true,
  });

exports.getAvailability = hotelId => Stay.getHotelAvailability(hotelId);

// exports.fetchOne = id => Hotel.findOne({ where: { id } });

exports.create = hotelInfo => Hotel.create(hotelInfo);
