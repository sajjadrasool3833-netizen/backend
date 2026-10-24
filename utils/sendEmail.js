const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // Note: Aapko Gmail ka "App Password" banana hoga (Normal password kaam nahi karega)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sajjadrasool3833@gmail.com', // Aapka Gmail
      pass: 'tghh dvil vlny pjrt', // App Password
    },
  });

  const mailOptions = {
    from: 'TTS Collection <no-reply@ttscollection.com>',
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;