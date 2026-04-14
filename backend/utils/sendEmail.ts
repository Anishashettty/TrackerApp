// const nodemailer = require("nodemailer");

// const sendEmail = async (to, password) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,  
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to,
//     subject: "Your Account Created",
//     text: `Your account has been created.
// Email: ${to}
// Password: ${password}

// Please login and change your password.`,
//   });
// };

// module.exports = sendEmail;   


import nodemailer from "nodemailer";

//  function types
const sendEmail = async (to: string, password: string): Promise<void> => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER as string,
      pass: process.env.EMAIL_PASS as string,
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

export default sendEmail;