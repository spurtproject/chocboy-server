const { SENDGRID_API_KEY } = require('../config/keys');
const sgMail = require('@sendgrid/mail');
const logger = require('./logger');
sgMail.setApiKey(SENDGRID_API_KEY);

const Mailgen = require('mailgen');
var mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    // Appears in header & footer of e-mails
    name: 'The Twitee Team',
    link: 'https://mailgen.js/',
    // Optional product logo
    // logo: 'https://mailgen.js/img/logo.png'
  },
});

const sendOnboardingMail = async (nameOfUser, userMail) => {
  const email_sender = 'Twittee Social Media <wonderland@cecafric.com>';
  const subject_matter = 'Welcome on Board to Twitee!';
  const email = {
    body: {
      greeting: `Heyy ${nameOfUser}`,
      intro: [
        `You are receiving this mail because you have just been enrolled on the Twitee App. Welcome to the app that brings the entire world to your comfort zone!`,
      ],

      action: {
        instructions: ``,
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
    to: userMail, // Change to your recipient
    from: email_sender,
    subject: subject_matter,
    text: mailGenerator.generatePlaintext(email),
    html: mailGenerator.generate(email),
  };
  await sgMail.send(msg, (error, body) => {
    if (error) {
      logger.info(error);
    }
    logger.info(body);
  });
};

module.exports = { sendOnboardingMail };
