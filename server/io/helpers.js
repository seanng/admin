const reply = (client, data) => client.emit('action', data);
const convey = (client, receiverSocketId, data) =>
  client.to(receiverSocketId).emit(data);

module.exports = {
  reply,
  convey,
};
