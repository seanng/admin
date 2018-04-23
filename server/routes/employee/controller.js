const { Employee } = require('../../db/models');
const { generatePassword } = require('../../utils/helpers');
const { sendMail } = require('../../services');

exports.addEmployee = async req => {
  const newUserDetails = {
    ...req.body.details,
    password: generatePassword(),
    inviterId: req.body.userId,
    hotelId: req.body.hotelId,
  };
  const userInfo = await Employee.create(req.body);
  const htmlOptions = {
    firstName: userInfo.firstName,
    password: newUserDetails.password,
    userId: userInfo.id,
    hotelName: userInfo['hotel.name'],
    email: userInfo.email,
  };
  sendMail({
    to: userInfo.email,
    htmlOptions,
  });
  const employees = await Employee.fetchAll({
    hotelId: newUserDetails.hotelId,
  });
  return employees;
};
