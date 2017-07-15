const { Surcharge, Stay } = require('../../db/config');
const { reply } = require('../helpers');

const saveCharges = (charges, totalCharge, stayId, respond) =>
  // save charges into Surcharge
  charges
    .reduce(
      (promiseChain, charge) => Surcharge.create(charge),
      Promise.resolve(),
    )
    .then(() =>
      Stay.update({ totalCharge }, { where: { id: stayId } }).then(() =>
        Surcharge.findAll({ where: { stayId } }).then(updatedCharges =>
          respond(null, updatedCharges, totalCharge),
        ),
      ),
    );

module.exports = (client, action) => {
  const { charges, newTotal, stayId } = action;
  return saveCharges(charges, newTotal, stayId, (err, updatedCharges) => {
    if (err) {
      console.log('error!', err);
      return reply(client, {
        type: 'SAVE_CHARGES_ERROR',
      });
    }
    return reply(client, {
      type: 'SAVE_CHARGES_SUCCESS',
      updatedCharges,
      stayId,
      newTotal,
    });
  });
};
