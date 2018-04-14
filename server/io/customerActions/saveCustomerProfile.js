const Customer = require('../../db/models/Customer');
const {
  decodeBase64Image,
  createFile,
  sendUploadToGCS,
  getPublicUrl,
} = require('../../services/imageHosting');
const { reply } = require('../helpers');

const handleSuccess = (client, profile) =>
  reply(client, {
    type: 'SAVE_CUSTOMER_PROFILE_SUCCESS',
    profile,
  });

const handleFail = (client, err) =>
  reply(client, {
    type: 'SAVE_CUSTOMER_PROFILE_ERROR',
    err,
  });

module.exports = async (client, action) => {
  try {
    const { profile, shouldHandleBase64 } = action;
    if (!shouldHandleBase64) {
      const profileInfo = await Customer.updateProfile(profile);
      return handleSuccess(client, profileInfo);
    }
    const blob = await decodeBase64Image(profile.avatarUrl);
    const data = await createFile(blob);
    const gcsname = await sendUploadToGCS(
      data,
      `customers/profiles/${profile.id}`
    );
    const avatarUrl = await getPublicUrl(gcsname);
    const info = await Customer.updateProfile({ ...profile, avatarUrl });
    return handleSuccess(info, client);
  } catch (error) {
    return handleFail(client, error);
  }
};
