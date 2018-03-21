const { updateProfile } = require('../../services/customer');
const {
  decodeBase64Image,
  createFile,
  sendUploadToGCS,
  getPublicUrl,
} = require('../../services/imageHosting');
const { reply } = require('../helpers');

const handleSuccess = (profile, client) =>
  reply(client, {
    type: 'SAVE_CUSTOMER_PROFILE_SUCCESS',
    profile,
  });

const handleFail = (err, client) =>
  reply(client, {
    type: 'SAVE_CUSTOMER_PROFILE_ERROR',
    err,
  });

module.exports = (client, action) =>
  new Promise((resolve, reject) => {
    const { profile, shouldHandleBase64 } = action;
    if (!shouldHandleBase64) {
      return updateProfile(profile)
        .then(info => resolve(handleSuccess(info, client)))
        .catch(error => reject(handleFail(error, client)));
    }

    return decodeBase64Image(profile.avatarUrl)
      .then(blob => createFile(blob))
      .then(data => sendUploadToGCS(data, `customers/profiles/${profile.id}`))
      .then(gcsname => getPublicUrl(gcsname))
      .then(avatarUrl => updateProfile({ ...profile, avatarUrl }))
      .then(info => resolve(handleSuccess(info, client)))
      .catch(error => reject(handleFail(error, client)));
  });
