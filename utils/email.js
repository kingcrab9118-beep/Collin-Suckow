const nodemailer = require('nodemailer');

const {EMAIL_USER, EMAIL_APP_PASSWORD} = process.env;

const createTransporter = async () => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_APP_PASSWORD,
    },
  });

  return transporter;
};

const sendEmail = async (options) => {
  const emailTransport = await createTransporter();
  await emailTransport.sendMail({from: EMAIL_USER, ...options});
};

module.exports = {sendEmail};
