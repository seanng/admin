const { updateProfile } = require('../../services/employee');
const {
  createFile,
  sendUploadToGCS,
  getPublicUrl,
} = require('../../services/imageHosting');
const { reply } = require('../helpers');

const handleSuccess = (profile, client) =>
  reply(client, {
    type: 'app/Settings/SAVE_EMPLOYEE_PROFILE_SUCCESS',
    profile,
  });

const handleFail = (err, client) =>
  reply(client, {
    type: 'app/Settings/SAVE_EMPLOYEE_PROFILE_ERROR',
    err,
  });

module.exports = (client, action) =>
  new Promise((resolve, reject) => {
    const { profile, shouldHandleImageBlob } = action;
    if (!shouldHandleImageBlob) {
      return updateProfile(profile)
        .then(info => resolve(handleSuccess(info, client)))
        .catch(error => reject(handleFail(error, client)));
    }

    return createFile(profile.photoUrl)
      .then(data => sendUploadToGCS(data, `employees/profiles/${profile.id}`))
      .then(gcsname => getPublicUrl(gcsname))
      .then(photoUrl => updateProfile({ ...profile, photoUrl }))
      .then(info => resolve(handleSuccess(info, client)))
      .catch(error => reject(handleFail(error, client)));
  });
