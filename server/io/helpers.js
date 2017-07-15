const reply = (client, data) => client.emit('action', data);

module.exports = {
  reply,
};
