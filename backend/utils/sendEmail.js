const nodemailer = require("nodemailer");

const sendEmail = async (to, password) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,  
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: "Your Account Created",
    text: `Your account has been created.
Email: ${to}
Password: ${password}

Please login and change your password.`,
  });
};

module.exports = sendEmail;   