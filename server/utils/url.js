const notFound = { action: null, params: [] };

const reducer = (prev, current) => {
  if (prev.action && prev.action[current]) {
    return { action: prev.action[current], params: [] };
  } else if (typeof prev.action === 'function') {
    return { action: prev.action, params: prev.params.concat(current) }; // params are found
  }
  return notFound;
};

const mapUrl = (availableActions = {}, url = []) => {
  if (url.length === 0 || Object.keys(availableActions).length === 0) {
    return notFound;
  }

  const actionAndParams = url.reduce(reducer, {
    action: availableActions,
    params: [],
  });

  return typeof actionAndParams.action === 'function'
    ? actionAndParams
    : notFound;
};

module.exports = mapUrl;
