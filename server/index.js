/* eslint consistent-return:0 */
/* eslint global-require:0 */
const bodyParser = require('body-parser');
const morgan = require('morgan');
const argv = require('minimist')(process.argv.slice(2));
const logger = require('./logger');
const frontendSetup = require('./config/frontendMiddleware');
const api = require('./api');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const resolve = require('path').resolve;
const app = require('express')();
const io = require('./io');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  morgan(':method :url :status :response-time ms - :res[content-length]')
);
app.use('/api', api);

// In production we need to pass these values in instead of relying on webpack
frontendSetup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 5050 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';
const port = argv.port || process.env.PORT || 5050;

// Start your app.
const server = app.listen(port, host, err => {
  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, prettyHost, url);
    });
  } else {
    logger.appStarted(port, prettyHost);
  }

  // preload with fake data
  // require('./db/fakeData')()
});
// initialize server-side sockets
io.attach(server);
