const stays = require('../../services/stays');
const { reply } = require('../helpers');

module.exports = (client, action) =>
  new Promise((resolve, reject) => {
    stays
      .fetchActive(action.hotelId)
      .then(rooms =>
        resolve(
          reply(client, {
            type: 'app/FrontDesk/FETCH_ROOMS_SUCCESS',
            rooms,
          })
        )
      )
      .catch(error => {
        reply(client, {
          type: 'app/FrontDesk/FETCH_ROOMS_ERROR',
          error,
        });
        reject(error);
      });
  });
