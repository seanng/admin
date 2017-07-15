/* eslint consistent-return:0 */

const express = require('express');
// eslint-disable-next-line import/no-unresolved
const bodyParser = require('body-parser');
const pretty = require('pretty-error')();
const logger = require('./logger');
const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');

const isDev = process.env.NODE_ENV !== 'production';
const ngrok =
  (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel
    ? require('ngrok')
    : false;
const resolve = require('path').resolve;
const app = express();

const { preloadData } = require('./db/fakeData');
const actions = require('./actions');
const mapUrl = require('./utils/url');

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);
app.use(bodyParser.json());

app.use('/api', (req, res) => {
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);
  const { action, params } = mapUrl(actions, splittedUrlPath);

  console.log('req body:', req.body);
  if (action) {
    action(req, params).then(
      result => {
        if (result instanceof Function) {
          result(res);
        } else {
          res.json(result);
        }
      },
      reason => {
        if (reason && reason.redirect) {
          res.redirect(reason.redirect);
        } else {
          console.error('API ERROR:', pretty.render(reason));
          res.status(reason.status || 500).json(reason);
        }
      }
    );
  } else {
    res.status(404).end('NOT FOUND');
  }
});

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
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
  preloadData();
});

// initialize server-side sockets
require('./io')(server);
