require("dotenv").config();
const mail = require("../helpers/mail/mail");
const { CHOCBOY_SENDER_EMAIL } = require("../config/keys");
const Mailgen = require("mailgen");

var mailGenerator = new Mailgen({
  theme: "default",
  product: {
    name: "The Chocboy Team",
    link: "https://chocboy-staging.netlify.app",
    // Optional product logo
    logo: "https://chocboy-staging.netlify.app/images/logo.svg",
  },
});

async function sendOTP(userMail, userPin) {
  const subject_matter = "Password Reset";
  const email = {
    body: {
      greeting: `Heyy There`,
      intro: [``],

      action: {
        instructions: `You are receiving this mail because you requested to reset your password. Your OTP is`,
        button: {
          color: "#79372A",
          text: userPin,
          link: "",
        },
      },
      outro: "",
    },
  };
  try {
    const msg = {
      to: userMail,
      from: CHOCBOY_SENDER_EMAIL,
      subject: subject_matter,
      html: mailGenerator.generate(email),
    };
    await mail.sendEmail(msg);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }
}

async function sendTreasureHuntMessage(userMail, userName) {
  const subject_matter = "Treasure Hunt";
  const email = {
    body: {
      greeting: `Dear ${userName}`,
      intro: [``],

      action: {
        instructions: `Thank you for choosing to participate in the upcoming Treasure Hunt. \nWe can't wait to see you there and share in the adventure of the Treasure Hunt! `,
        button: {
          color: "",
          text: "",
          link: "",
        },
      },
      outro: "",
    },
  };
  try {
    const msg = {
      to: userMail,
      from: CHOCBOY_SENDER_EMAIL,
      subject: subject_matter,
      html: mailGenerator.generate(email),
    };
    await mail.sendEmail(msg);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }
}

async function sendVendorMessage(userMail, userName) {
  const subject_matter = "Vendor Signup ";
  const email = {
    body: {
      greeting: `Dear ${userName}`,
      intro: [``],

      action: {
        instructions: `We are excited to inform you that your vendor signup has been successfully processed and approved!. \n Welcome to our platform as a valued vendor partner!`,
        button: {
          color: "",
          text: "",
          link: "",
        },
      },
      outro: "",
    },
  };
  try {
    const msg = {
      to: userMail,
      from: CHOCBOY_SENDER_EMAIL,
      subject: subject_matter,
      html: mailGenerator.generate(email),
    };
    await mail.sendEmail(msg);
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw error;
  }
}

module.exports = { sendOTP, sendTreasureHuntMessage, sendVendorMessage };
