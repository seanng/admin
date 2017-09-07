const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const DEFAULTS = {
  from: 'haven.dvpt@gmail.com',
  to: 'haven.dvpt@gmail.com',
  subject: 'Haven app verification e-mail',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

const sendMail = ({
  from = DEFAULTS.from,
  to = DEFAULTS.to,
  subject = DEFAULTS.subject,
  html = DEFAULTS.html,
}) => {
  sgMail.send({ from, to, subject, html });
};

module.exports = sendMail;
