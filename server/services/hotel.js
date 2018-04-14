const { Hotel, Stay } = require('../db/models');

exports.updateProfile = hotelInfo =>
  Hotel.update(hotelInfo, {
    where: { id: hotelInfo.id },
    returning: true,
    plain: true,
    raw: true,
  }).then(data => data[1]);

exports.fetchAll = () =>
  Hotel.findAll({
    attributes: { exclude: [] },
    raw: true,
  });

exports.fetchOne = id => Hotel.findOne({ where: { id } });

exports.getAvailability = hotelId =>
  Stay.count({
    where: {
      hotelId,
      status: 'AVAILABLE',
    },
  }).then(availableRooms => !!availableRooms && availableRooms > 0);

exports.fetchOne = id => Hotel.findOne({ where: { id } });

exports.create = hotelInfo => Hotel.create(hotelInfo);
