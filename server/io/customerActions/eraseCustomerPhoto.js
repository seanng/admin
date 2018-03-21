const { deletePhotoFromCloudStorage } = require('../../services/imageHosting');
const { reply } = require('../helpers');

const handleSuccess = client =>
  reply(client, {
    type: 'ERASE_CUSTOMER_PHOTO_SUCCESS',
  });

const handleFail = (client, error) =>
  reply(client, {
    type: 'ERASE_CUSTOMER_PHOTO_ERROR',
    error,
  });

module.exports = (client, action) =>
  new Promise((resolve, reject) =>
    deletePhotoFromCloudStorage(action.photo)
      .then(() => resolve(handleSuccess(client)))
      .catch(error => reject(handleFail(client, error)))
  );
