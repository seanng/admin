const Employee = require('../../db/config').Employee;
const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');

const cipher = Promise.promisify(bcrypt.hash);

Employee.beforeCreate(user =>
  cipher(user.password, null, null).then(hashedPw => {
    const updatedUser = Object.assign({}, user);
    updatedUser.password = hashedPw;
    return updatedUser;
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
      if (err) {
        return cb(err);
      }

      console.log(
        'candidate password: ',
        candidatePassword,
        this.getDataValue('password')
      );
      return cb(null, isMatch);
    }
  );
};

module.exports = Employee;
