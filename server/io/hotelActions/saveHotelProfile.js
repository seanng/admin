const Promise = require('bluebird');
const hotel = require('../../services/hotel');
const {
  createFile,
  sendUploadToGCS,
  getPublicUrl,
} = require('../../services/imageHosting');
const { reply } = require('../helpers');

const getImageUrls = oldPhotos =>
  Promise.map(oldPhotos, oldPhoto => {
    const containsUrl =
      typeof oldPhoto === 'string' && oldPhoto.search('http') === 0;
    if (containsUrl) {
      return oldPhoto;
    }
    return createFile(oldPhoto)
      .then(data => sendUploadToGCS(data, 'hotelProfile'))
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
      return hotel
        .updateProfile(hotelInfo)
        .then(info => resolve(handleSuccess(info, client)))
        .catch(error => reject(handleFail(error, client)));
    }
    return getImageUrls(hotelInfo.photos).then(photos => {
      hotelInfo.photos = photos;
      return hotel
        .updateProfile(hotelInfo)
        .then(info => resolve(handleSuccess(info, client)))
        .catch(error => reject(handleFail(error, client)));
    });
  });
