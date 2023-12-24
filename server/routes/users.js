const express = require("express");
const bcrypt = require("bcrypt");
const { auth, authAdmin } = require("../middlewares/auth");
const { UserModel, validUser, validLogin, createToken } = require("../models/userModel")
const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ msg: "Users work" })
})

module.exports = router;