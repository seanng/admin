const { validateToken } = require('../db/helpers');

function generatePassword() {
  return Math.random().toString(36).slice(-8);
}

function generateEmailHtml({ firstName, lastName, password, email }) {
  const html = `
    <p>
      Hi ${firstName} ${lastName},
    </p>
    <p>
      You've been invited to join Haven! Your login information is as below: 
    </p>
    <p>
      Username: ${email}
    </p>
    <p>
      Password: ${password}
    </p>
    <p>
      Please change your password as soon as you've logged in for the first time!
    </p>
  `;
  return html;
}

const getUserIdByReq = req =>
  new Promise((resolve, reject) => {
    validateToken(req.header('Authorization'), (err, customer) => {
      if (err) {
        return reject(err);
      }
      return resolve(customer.userId);
    });
  });

module.exports = {
  generatePassword,
  generateEmailHtml,
  getUserIdByReq,
};
