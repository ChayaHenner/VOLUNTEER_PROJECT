
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { UserModel} = require("../models/userModel")
const { createToken } = require("../helpers/userHelper");


router.post('/', async (req, res) => {
  const userEmail = req.body.email;
  console.log(userEmail);
  let user = await UserModel.findOne({ email: userEmail});
  console.log(user);

  // יצירת טוקן
  let resetToken = createToken(user._id, user.role);

  // יצירת נפשק
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'illuminatectb@gmail.com',
      pass: 'whpe aexn cgqp rxpn'
    }
  });

  // נתוני הדוא"ל
  const mailOptions = {
    from: 'illuminatectb@gmail.com',
    to: userEmail,
    subject: 'Password Reset',
    html: `
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f4f4;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #800080; /* סגול */
            }
            p {
              line-height: 1.6;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #800080; /* סגול */
              color: white; /* לבן */
              text-decoration: none;
              text-color: #fff;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Password Reset</h1>
            <p>Click the following button to reset your password:</p>
            <a class="button" href="http://localhost:3000/reset-password/${resetToken}">Reset Password</a>
          </div>
        </body>
      </html>
    `,
  };
  
  

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Password reset email sent successfully.' });
  } catch (error) {
    console.error('Error sending password reset email:', error.message);
    res.status(500).json({ success: false, message: 'Failed to send password reset email.' });
  }
});

module.exports = router;

