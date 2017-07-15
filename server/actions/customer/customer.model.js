const Customer = require('../../db/config').Customer;
const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');

const cipher = Promise.promisify(bcrypt.hash);

Customer.beforeCreate(user =>
  cipher(user.password, null, null).then(hashedPw => {
    const updatedUser = { ...user };
    updatedUser.password = hashedPw;
    return updatedUser;
  }),
);

Customer.Instance.prototype.comparePassword = function comparePassword(
  candidatePassword,
  cb,
) {
  bcrypt.compare(
    candidatePassword,
    this.getDataValue('password'),
    (err, isMatch) => {
      if (err) {
        return cb(err);
      }
      return cb(null, isMatch);
    },
  );
};

module.exports = Customer;