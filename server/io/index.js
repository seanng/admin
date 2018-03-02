const socketIO = require('socket.io');
// const actions = require('./actions');

const routeHandler = (io, client) =>
  client.on('action', action => {
    if (action.type && action.type.split('server/')[1]) {
      const actionInSnake = action.type.split('server/')[1];
      const actionInCamel = actionInSnake
        .toLowerCase()
        .replace(/_\w/g, str => str[1].toUpperCase());

      // eslint-disable-next-line global-require
      const reducerFile = require(`./actions/${actionInCamel}`);
      if (!reducerFile) {
        return;
      }
      reducerFile(client, action);
    }
  });

module.exports = server => {
  const io = socketIO.listen(server);
  io.on('connection', client => {
    console.log('conencted: ');
    routeHandler(io, client);
  });
  return io;
};
