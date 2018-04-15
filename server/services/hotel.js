const payments = require('./payments');

const { Hotel, Stay } = require('../db/models');

exports.fetchAll = () =>
  Hotel.findAll({
    attributes: { exclude: [] },
    raw: true,
  });

exports.getAvailability = hotelId => Stay.getHotelAvailability(hotelId);

exports.create = async (hotelInfo, stripeCode) => {
  const { stripe_user_id: stripeId } = await payments.getHotelStripeId(
    stripeCode
  );
  hotelInfo.stripeId = stripeId;
  return Hotel.create(hotelInfo);
};
