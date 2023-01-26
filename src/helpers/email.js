require('dotenv').config();
const {
  SENDGRID_API_KEY,
  AUTH_EMAIL,
  GOOGLE_CLIENTID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  AUTH_PASSWORD,
  ELASTIC_API_KEY,
  ELASTIC_USERNAME,
} = require('../config/keys');
const elasticemail = require('elasticemail');
const MAILGUN_KEY = process.env.MAILGUN_API_KEY;
const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
const nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const logger = require('./logger');
var client = elasticemail.createClient({
  username: ELASTIC_USERNAME,
  apiKey: ELASTIC_API_KEY,
});
sgMail.setApiKey(SENDGRID_API_KEY);

const Mailgen = require('mailgen');
var mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    // Appears in header & footer of e-mails
    name: 'The Chocboy Team',
    link: 'https://mailgen.js/',
    // Optional product logo
    // logo: 'https://mailgen.js/img/logo.png'
  },
});

const sendOTP = async (userMail, userPin) => {
  console.log(userMail, userPin);
  const email_sender = 'info@davayte.net';
  const subject_matter = 'Password Reset';
  const email = {
    body: {
      greeting: `Heyy There`,
      intro: [``],

      action: {
        instructions: `You are receiving this mail because you requested to reset your password. Your OTP is ${userPin}.`,
        button: {
          color: '', // Optional action button color
          text: '',
          link: '',
        },
      },
      outro: '',
    },
  };
  const msg = {
    // Change to your recipient
    from: email_sender,
    from_name: 'Chocboy Support',
    to: userMail,
    subject: subject_matter,
    body_text: mailGenerator.generatePlaintext(email),
    // html: mailGenerator.generate(email),
  };
  client.mailer.send(msg, function(err, result) {
    if (err) {
      return console.error(err);
    }

    console.log(result);
  });
};

module.exports = { sendOTP };
