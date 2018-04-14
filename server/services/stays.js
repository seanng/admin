const { Stay, Surcharge } = require('../db/models');

// TODO: MOVE TO DB MODELS
exports.fetchCharges = queryParams => Surcharge.findAll({ where: queryParams });

exports.fetchActive = async hotelId => await Stay.fetchActive(hotelId);

exports.fetchHotelHistory = async hotelId =>
  await Stay.fetchHotelHistory(hotelId);

exports.fetchCustomerHistory = async customerId =>
  await Stay.fetchCustomerHistory(customerId);
