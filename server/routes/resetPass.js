
const express = require('express');
const router = express.Router();
const { auth, authAdmin } = require("../middlewares/auth");
const { UserModel} = require("../models/userModel")


// קישור למסד נתונים או ללוגיקה נוספת לאימות הטוקן
// const { validateResetToken, resetPassword } = require('./your-auth-module');

router.get('/:token',(req, res) => {
  const resetToken = req.params.token;

});

router.post('/',auth,async (req, res) => {
    console.log("POST");
  const resetToken = req.params.token;
  const Id=req.tokenData._id;
  const newPassword = req.body.password;
  try{
      data = await UserModel.updateOne({ _id: Id }, { $set: { password:newPassword } });
      res.json(data);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "there error try again later", err })
      }

});

module.exports = router;
