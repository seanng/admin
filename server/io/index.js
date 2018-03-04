const { reply } = require('./helpers');
const socketIO = require('socket.io');

function routeActionToFile(action, folder, client, io) {
  const actionInCamel = action.type
    .split('_IO_')[1]
    .toLowerCase()
    .replace(/_\w/g, str => str[1].toUpperCase());

  // eslint-disable-next-line global-require
  const reducerFile = require(`./${folder}/${actionInCamel}`);
  if (!reducerFile) {
    return;
  }
  reducerFile(client, action, io);
}

function clientHandler(io, client) {
  client.on('action', action => {
    if (action.type && action.type.split('_IO_').length > 1) {
      const actionType = action.type.split('_IO_');
      actionType[0] === 'H' &&
        routeActionToFile(action, 'hotelActions', client, io);
      actionType[0] === 'C' &&
        routeActionToFile(action, 'customerActions', client, io);
    }
  });
}

module.exports = server => {
  const io = socketIO.listen(server);
  io.on('connection', client => {
    console.log(client.id, ' has connected ');
    reply(client, {
      type: 'SOCKET_CONNECTION_ESTABLISHED',
      socketId: client.id,
    });
    clientHandler(io, client);
  });
};
