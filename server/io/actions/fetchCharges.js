const { Surcharge } = require('../../db/models');
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
        type: 'app/PastStays/FETCH_CHARGES_ERROR',
        err,
      });
    }
    return reply(client, {
      type: 'app/PastStays/FETCH_CHARGES_SUCCESS',
      charges,
    });
  });
