const { Stay, Surcharge } = require('../../db/models');
const { reply } = require('../helpers');

const saveCharges = async (charges, totalCharge, stayId) => {
  // eslint-disable-next-line
  for (const charge of charges) {
    await Surcharge.create(charge);
  }
  await Stay.update({ totalCharge }, { where: { id: stayId } });
  return await Surcharge.findAll({ where: { stayId } });
};

const handleSuccess = (client, updatedCharges, stayId, newTotal) =>
  reply(client, {
    type: 'app/PastStays/SAVE_CHARGES_SUCCESS',
    updatedCharges,
    stayId,
    newTotal,
  });

const handleFail = (client, err) =>
  reply(client, {
    type: 'SAVE_CHARGES_ERROR',
    err,
  });

module.exports = async (client, action) => {
  try {
    const { charges, newTotal, stayId } = action;
    const updatedCharges = await saveCharges(charges, newTotal, stayId);
    return handleSuccess(updatedCharges, stayId, newTotal);
  } catch (error) {
    return handleFail(error);
  }
};
