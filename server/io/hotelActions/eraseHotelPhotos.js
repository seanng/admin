const { erasePhotosArray } = require('../../services/imageHosting');
const { reply } = require('../helpers');

const handleSuccess = client =>
  reply(client, {
    type: 'app/PastStays/ERASE_HOTEL_PHOTOS_SUCCESS',
  });

const handleFail = (client, error) =>
  reply(client, {
    type: 'app/PastStays/ERASE_HOTEL_PHOTOS_ERROR',
    error,
  });

module.exports = async (client, action) => {
  try {
    await erasePhotosArray(action.photos);
    return handleSuccess(client);
  } catch (err) {
    return handleFail(client, err);
  }
};
