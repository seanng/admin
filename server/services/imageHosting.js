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

const bucket = storage.bucket(BUCKET_NAME);

const getPublicUrl = filename =>
  `https://storage.googleapis.com/${BUCKET_NAME}/${filename}`;

const getFileName = url =>
  url.split('https://storage.googleapis.com')[1].split('/')[2];

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

const sendUploadToGCS = (fileBuffer, key) =>
  new Promise((resolve, reject) => {
    const gcsname = key + Date.now();
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

const deleteFromCloudStorage = photos =>
  photos.reduce(
    (promise, photoUrl) =>
      promise.then(() => {
        const fileName = getFileName(photoUrl);
        return bucket.file(fileName).delete();
      }),
    Promise.resolve()
  );

module.exports = {
  createFile,
  getPublicUrl,
  sendUploadToGCS,
  deleteFromCloudStorage,
};
