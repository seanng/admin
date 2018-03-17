const { erasePhotosArray } = require('../../services/imageHosting');
const { reply } = require('../helpers');

const handleSuccess = client =>
  reply(client, {
    type: 'app/PastStays/ERASE_REMOVED_PHOTOS_SUCCESS',
  });

const handleFail = (client, error) =>
  reply(client, {
    type: 'app/PastStays/ERASE_REMOVED_PHOTOS_ERROR',
    error,
  });

module.exports = (client, action) =>
  new Promise((resolve, reject) =>
    erasePhotosArray(action.photos)
      .then(() => resolve(handleSuccess(client)))
      .catch(error => reject(handleFail(client, error)))
  );
