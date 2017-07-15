const { Surcharge } = require('../../db/config');
const { reply } = require('../helpers');

const fetchCharges = (stayId, respond) => {
  Surcharge.findAll({
    where: { stayId },
  })
    .then(charges => {
      respond(null, charges);
    })
    .catch(err => respond(err));
};

module.exports = (client, action) =>
  fetchCharges(action.stayId, (err, charges) => {
    if (err) {
      console.log('error finding charges.', err);
      return reply(client, {
        type: 'FETCH_CHARGES_ERROR',
        err,
      });
    }
    return reply(client, {
      type: 'FETCH_CHARGES_SUCCESS',
      charges,
    });
  });
