const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const corsWhitelist = {
  development: ['http://localhost:8080'],
  production: [],
};

const corsOptions = {
  origin(origin, callback) {
    if (corsWhitelist[process.env.NODE_ENV].indexOf(origin) === -1) {
      callback(new Error('Not allowed by CORS'));
    } else {
      callback(null, true);
    }
  },
};

module.exports = app => {
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(
    morgan(':method :url :status :response-time ms - :res[content-length]')
  );
  app.use(cors(corsOptions));
  return app;
};
