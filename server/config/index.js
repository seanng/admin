const _ = require('lodash');
const dotenv = require('dotenv');

dotenv.config();

const config = {
  postgres: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    dbName: process.env.POSTGRES_DB_NAME,
  },
};

const getConfigurationValue = key => _.get(config, key);

module.exports = {
  getConfigurationValue,
};