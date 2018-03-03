const directory = {
  customer: {},
  hotel: {},
  activeConnections: {},
};

function getDirectory() {
  return directory;
}

function getActiveConnections() {
  return directory.activeConnections;
}

function getCustomerSocket(customerId) {
  if (directory.customer[customerId] === undefined) {
    return null;
  }
  return directory.customer[customerId];
}

function getHotelSockets(hotelId) {
  if (
    directory.hotel[hotelId] === undefined ||
    directory.hotel[hotelId].length === 0
  ) {
    return null;
  }
  return directory.hotel[hotelId];
}

function addCustomerSocket(customerId, socketId) {
  directory.activeConnections[socketId] = {
    userType: 'customer',
    id: customerId,
  };
  directory.customer[customerId] = socketId;
  return true;
}

function addHotelSockets(hotelId, socketId) {
  directory.activeConnections[socketId] = {
    userType: 'hotel',
    id: hotelId,
  };
  if (directory.hotel[hotelId]) {
    directory.hotel[hotelId].push(socketId);
  } else {
    directory.hotel[hotelId] = [socketId];
  }
  return true;
}

function removeSocket(socketId, cb) {
  if (!directory.activeConnections[socketId]) {
    return cb(null);
  }
  const { userType, id } = directory.activeConnections[socketId];
  delete directory.activeConnections[socketId];
  if (userType === 'customer') {
    delete directory.customer[id];
    return cb(null);
  }
  directory.hotel[id] = directory.hotel[id].filter(e => e !== socketId);
  return cb(null);
}

module.exports = {
  getDirectory,
  getActiveConnections,
  getCustomerSocket,
  getHotelSockets,
  addCustomerSocket,
  addHotelSockets,
  removeSocket,
};
