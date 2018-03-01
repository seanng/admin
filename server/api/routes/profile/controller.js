const Customer = require('../../../db/models/Customer');
const { getUserIdByReq } = require('../../../utils/helpers');
const controller = {};

controller.update = (resolve, reject, req) => {
  getUserIdByReq(req)
    .then(userId => {
      Customer.update(req.body.profile, {
        where: { id: userId },
      }).then(() => resolve({ profile: req.body.profile }));
    })
    .catch(err => {
      reject(err);
    });
};

module.exports = controller;
