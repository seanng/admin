const hotel = require('../../services/hotel');
const { reply } = require('../helpers');

const handleSuccess = (client, info) =>
  reply(client, {
    type: 'app/HotelProfile/GET_HOTEL_INFO_SUCCESS',
    info,
  });

const handleFail = (client, err) =>
  reply(client, {
    type: 'GET_HOTEL_INFO_ERROR',
    err,
  });

module.exports = async (client, action) => {
  try {
    const hotelInfo = await hotel.fetchOne(action.id);
    return handleSuccess(client, hotelInfo);
  } catch (error) {
    return handleFail(client, error);
  }
};
