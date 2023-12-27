const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  const userEmail = req.body.email;
console.log(userEmail);
  // כאן יש להוסיף לוגיקה ליצירת קישור או טוקן שישלח לאימייל למעבר לדף שחזור הסיסמה

  // יצירת נפשק
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'illuminatectb@gmail.com',
      pass: 'ctbctbctb'
    }
  });

  // נתוני הדוא"ל
  const mailOptions = {
    from: 'illuminatectb@gmail.com',
    to: userEmail,
    subject: 'Password Reset',
    text: 'Click the following link to reset your password: http://yourdomain.com/reset-password/'
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Password reset email sent successfully.' });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    res.status(500).json({ success: false, message: 'Failed to send password reset email.' });
  }
});

module.exports = router;
