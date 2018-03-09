const { Hotel } = require('../db/models');

const updateProfile = hotelInfo =>
  Hotel.update(hotelInfo, {
    where: { id: hotelInfo.id },
    returning: true,
    plain: true,
    raw: true,
  }).then(data => data[1]);

const fetchOne = id => Hotel.findOne({ where: { id } });

module.exports = {
  updateProfile,
  fetchOne,
};
