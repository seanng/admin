const Storage = require('@google-cloud/storage');
const Promise = require('bluebird');
const { getConfigurationValue } = require('../config/env');
const BUCKET_NAME = 'haven-server-images';
const fs = Promise.promisifyAll(require('fs'));
const keyFilenamePath = 'GCS-key.json';

const storage = Storage({
  projectId: getConfigurationValue('gcs').projectId,
  keyFilename: keyFilenamePath,
});

const getPublicUrl = filename =>
  `https://storage.googleapis.com/${BUCKET_NAME}/${filename}`;

const getInfoFromUrl = url => {
  const route = url.split('https://storage.googleapis.com/')[1];
  const bucketName = route.split('/')[0];
  const fileName = route.split(`${bucketName}/`)[1];
  return { bucketName, fileName };
};

const createFile = blob =>
  new Promise(resolve => {
    const path = `${__dirname}/temp.png`;
    const fileStream = fs.createWriteStream(path);
    fileStream.write(blob);
    fileStream.end(() => {
      fs.readFile(path, (err, data) => {
        fs.unlink(path);
        resolve(data);
      });
    });
  });

const sendUploadToGCS = (fileBuffer, prefix) =>
  new Promise((resolve, reject) => {
    const gcsname = `${prefix}/${Date.now()}`;
    const bucket = storage.bucket(BUCKET_NAME);
    const bucketFile = bucket.file(gcsname);
    const cloudStream = bucketFile.createWriteStream({
      metadata: { contentType: 'image/png' },
    });
    cloudStream.on('error', error => reject(error));
    cloudStream.on('finish', () => {
      bucketFile.makePublic().then(() => resolve(gcsname));
    });
    cloudStream.end(fileBuffer);
  });

const deletePhotoFromCloudStorage = photoUrl => {
  const { bucketName, fileName } = getInfoFromUrl(photoUrl);
  const bucket = storage.bucket(bucketName);
  return bucket.file(fileName).delete();
};

const erasePhotosArray = photos =>
  photos.reduce(
    (promise, photoUrl) =>
      promise.then(() => deletePhotoFromCloudStorage(photoUrl)),
    Promise.resolve()
  );

module.exports = {
  createFile,
  getPublicUrl,
  sendUploadToGCS,
  erasePhotosArray,
  deletePhotoFromCloudStorage,
};
