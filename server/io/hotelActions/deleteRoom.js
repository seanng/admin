const { Stay } = require('../../db/models');
const { reply } = require('../helpers');

const deleteRoom = (id, respond) => {
  Stay.destroy({
    where: { id },
  }).then(() => respond(null, id));
};

module.exports = (client, action) =>
  // hotelId obtained from socket token.
  // for now, pass in fake hotelId of 1
  deleteRoom(action.stayId, (err, id) => {
    if (err) {
      return reply(client, {
        type: 'app/FrontDesk/DELETE_ROOM_ERROR',
        err,
      });
    }
    return reply(client, {
      type: 'app/FrontDesk/DELETE_ROOM_SUCCESS',
      id,
    });
  });
