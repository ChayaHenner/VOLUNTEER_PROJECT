
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { UserModel} = require("../models/userModel")
const { createToken } = require("../helpers/userHelper");


// הוספת הפונקציה של יצירת הטוקן
// const crypto = require('crypto');

// function generateResetToken(email) {
//   const token = crypto.randomBytes(32).toString('hex');
//   // כאן יש אפשרות לשמור את הטוקן יחד עם האימייל במסד נתונים
//   return token;
// }

router.post('/', async (req, res) => {
  const userEmail = req.body.email;
  console.log(userEmail);
  let user = await UserModel.findOne({ email: userEmail});
  console.log(user);

  // יצירת טוקן
  let resetToken = createToken(user._id, user.role);
  // const resetToken = generateResetToken(userEmail);

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
    text: `Click the following link to reset your password: http://http://localhost:3000/reset-password/${resetToken}`
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

