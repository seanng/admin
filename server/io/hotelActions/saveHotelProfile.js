const Promise = require('bluebird');
const { updateProfile } = require('../../services/hotel');
const {
  createFile,
  sendUploadToGCS,
  getPublicUrl,
} = require('../../services/imageHosting');
const { reply } = require('../helpers');

const getImageUrls = (oldPhotos, hotelId) =>
  Promise.map(oldPhotos, oldPhoto => {
    const containsUrl =
      typeof oldPhoto === 'string' && oldPhoto.search('http') === 0;
    if (containsUrl) {
      return oldPhoto;
    }
    return createFile(oldPhoto)
      .then(data => sendUploadToGCS(data, `hotels/profiles/${hotelId}`))
      .then(gcsname => getPublicUrl(gcsname))
      .then(photoUrl => photoUrl);
  });

const handleSuccess = (hotelInfo, client) =>
  reply(client, {
    type: 'app/HotelProfile/SAVE_HOTEL_PROFILE_SUCCESS',
    hotelInfo,
  });

const handleFail = (err, client) =>
  reply(client, {
    type: 'app/HotelProfile/SAVE_HOTEL_PROFILE_ERROR',
    err,
  });

module.exports = (client, action) =>
  new Promise((resolve, reject) => {
    const { hotelInfo, shouldHandleImageBlobs } = action;
    if (!shouldHandleImageBlobs) {
      return updateProfile(hotelInfo)
        .then(info => resolve(handleSuccess(info, client)))
        .catch(error => reject(handleFail(error, client)));
    }
    return getImageUrls(hotelInfo.photos, hotelInfo.id)
      .then(photos => updateProfile({ ...hotelInfo, photos }))
      .then(info => resolve(handleSuccess(info, client)))
      .catch(error => reject(handleFail(error, client)));
  });
