const Hotel = require('../../db/models/Hotel');
const { reply } = require('../helpers');
const logger = require('../../logger');

const handleSuccess = (client, info) =>
  reply(client, {
    type: 'app/HotelProfile/GET_HOTEL_INFO_SUCCESS',
    info,
  });

const handleFail = (client, err) => {
  logger.error(err);
  reply(client, {
    type: 'GET_HOTEL_INFO_ERROR',
    err,
  });
};

module.exports = async (client, action) => {
  try {
    const hotelInfo = await Hotel.fetchOne({ id: action.id });
    return handleSuccess(client, hotelInfo);
  } catch (error) {
    return handleFail(client, error);
  }
};
