
const express = require('express');
const router = express.Router();
const { auth, authAdmin } = require("../middlewares/auth");
const { UserModel } = require("../models/userModel");
const bcrypt = require("bcrypt");


// קישור למסד נתונים או ללוגיקה נוספת לאימות הטוקן

router.get('/:token', (req, res) => {
  const resetToken = req.params.token;

});

router.post('/', auth, async (req, res) => {
  console.log("POST");
  const resetToken = req.params.token;
  const Id = req.tokenData._id;
  let newPassword = req.body.password;
  console.log(Id, newPassword);
  try {
    
    newPassword = await bcrypt.hash(newPassword, 10);
    console.log(newPassword);
    data = await UserModel.updateOne({ _id: Id }, { $set: { password: newPassword } });
    console.log(data);
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ msg: "there error try again later", err })
  }

});

module.exports = router;
