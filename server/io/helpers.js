const customerSocketMap = {};

function getCustomerSocketMap() {
  return customerSocketMap;
}

function reply(client, data) {
  client.emit('action', data);
}

function emitToCustomer(io, customerId, data) {
  const customerSocketId = customerSocketMap[customerId];
  customerSocketId && io.to(customerSocketId).emit('action', data);
}

function emitToHotel(io, hotelId, data) {
  io.to(`hotel:${hotelId}`).emit('action', data);
}

function getCustomerSocketId(customerId) {
  return customerSocketMap[customerId];
}

function setCustomerSocketId(customerId, socketId) {
  customerSocketMap[customerId] = socketId;
}

function linkEmployeeToHotelSockets(employeeSocket, hotelId) {
  employeeSocket.join(`hotel:${hotelId}`);
}

module.exports = {
  getCustomerSocketMap,
  getCustomerSocketId,
  setCustomerSocketId,
  reply,
  emitToCustomer,
  emitToHotel,
  linkEmployeeToHotelSockets,
};
