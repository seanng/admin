const { deletePhotoFromCloudStorage } = require('../../services/imageHosting');
const { reply } = require('../helpers');

const handleSuccess = client =>
  reply(client, {
    type: 'app/Settings/ERASE_EMPLOYEE_PHOTO_SUCCESS',
  });

const handleFail = (client, error) =>
  reply(client, {
    type: 'app/Settings/ERASE_EMPLOYEE_PHOTO_ERROR',
    error,
  });

module.exports = (client, action) =>
  new Promise((resolve, reject) =>
    deletePhotoFromCloudStorage(action.photo)
      .then(() => resolve(handleSuccess(client)))
      .catch(error => reject(handleFail(client, error)))
  );
