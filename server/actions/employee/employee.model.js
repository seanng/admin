const Employee = require('../../db/config').Employee;
const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');

const cipher = Promise.promisify(bcrypt.hash);

Employee.beforeCreate(user =>
  cipher(user.password, null, null).then(hashedPw => {
    // eslint-disable-next-line no-param-reassign
    user.password = hashedPw;
  })
);

Employee.Instance.prototype.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(
    candidatePassword,
    this.getDataValue('password'),
    (err, isMatch) => {
      console.log(
        'candidate password: ',
        candidatePassword,
        this.getDataValue('password')
      );
      if (err) {
        return cb(err);
      }

      return cb(null, isMatch);
    }
  );
};

module.exports = Employee;
