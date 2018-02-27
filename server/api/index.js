const pretty = require('pretty-error')();
const routes = require('./routes');

const notFound = { action: null, params: [] };

const reducer = (prev, current) => {
  if (prev.route && prev.route[current]) {
    return { route: prev.route[current], params: [] };
  } else if (typeof prev.route === 'function') {
    return { route: prev.route, params: prev.params.concat(current) }; // params are found
  }
  return notFound;
};

const mapUrl = (availableRoutes = {}, url = []) => {
  if (url.length === 0 || Object.keys(availableRoutes).length === 0) {
    return notFound;
  }

  const routeAndParams = url.reduce(reducer, {
    route: availableRoutes,
    params: [],
  });

  return typeof routeAndParams.route === 'function' ? routeAndParams : notFound;
};

module.exports = (req, res) => {
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1);
  const { route, params } = mapUrl(routes, splittedUrlPath);
  if (route) {
    route(req, params).then(
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
};
