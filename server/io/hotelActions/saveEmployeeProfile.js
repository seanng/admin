const Employee = require('../../db/models/Employee');
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

module.exports = async (client, action) => {
  try {
    const { profile, shouldHandleImageBlob } = action;
    if (!shouldHandleImageBlob) {
      const info = await Employee.updateProfile(profile);
      return handleSuccess(info, client);
    }
    const data = await createFile(profile.photoUrl);
    const gcsname = await sendUploadToGCS(
      data,
      `employees/profiles/${profile.id}`
    );
    const photoUrl = await getPublicUrl(gcsname);
    const info = await Employee.updateProfile({ ...profile, photoUrl });
    return handleSuccess(info, client);
  } catch (error) {
    return handleFail(error, client);
  }
};
