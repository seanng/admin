const socketIO = require('socket.io');
const { removeSocket, getDirectory } = require('./directory');

const clientHandler = (io, client) => {
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

  client.on('disconnect', () => {
    console.log(client.id, ' has disconnected.');
    removeSocket(client.id, () =>
      console.log('new directory: ', getDirectory())
    );
  });
};

module.exports = server => {
  const io = socketIO.listen(server);
  io.on('connection', client => {
    console.log(client.id, ' has connected. new directory: ', getDirectory());
    clientHandler(io, client);
  });
  return io;
};
