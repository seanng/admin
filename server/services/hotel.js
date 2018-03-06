const { Hotel } = require('../db/models');

const updateProfile = hotelInfo =>
  Hotel.update(hotelInfo, { where: { id: hotelInfo.id } });

const fetchOne = id => Hotel.findOne({ where: { id } });

module.exports = {
  updateProfile,
  fetchOne,
};
