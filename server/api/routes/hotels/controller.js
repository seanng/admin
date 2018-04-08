const R = require('ramda');
const Promise = require('bluebird');
const { hotel, employee, sendMail } = require('../../../services');

exports.getHotels = () =>
  hotel.fetchAll().then(hotels => {
    const hotelsAvailabilityPromise = Promise.map(
      R.map(R.prop('id'), hotels),
      hotel.getAvailability
    );
    return hotelsAvailabilityPromise.then(hotelsAvailability => {
      const hotelsWithAvailablity = R.zipWith(
        (availableHotel, isAvailable) =>
          Object.assign(availableHotel, { isAvailable }),
        hotels,
        hotelsAvailability
      );
      return { hotels: hotelsWithAvailablity };
    });
  });

exports.createHotel = req =>
  hotel
    .create(req.body.hotel)
    .then(hotelInfo =>
      employee.create({
        ...req.body.admin,
        adminLevel: 2,
        hotelId: hotelInfo.id,
      })
    )
    .then(employeeInfo => {
      // send email to that employee.
      const htmlOptions = {
        firstName: req.body.admin.firstName,
        password: req.body.admin.password,
        userId: employeeInfo.id,
        hotelName: req.body.hotel.name,
        email: req.body.admin.email,
      };
      sendMail({
        subject: 'this is a test email. ',
        to: 'shonum@gmail.com',
        htmlOptions,
      });
      return employeeInfo;
    });
