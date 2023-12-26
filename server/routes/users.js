const express = require("express");
const bcrypt = require("bcrypt");

const {validLogin,validUser}=require("../validation/userValidation")
const {validReport}=require("../validation/reportValidation")
const {createToken} = require("../helpers/userHelper");
const { auth, authAdmin } = require("../middlewares/auth");
const { UserModel} = require("../models/userModel")
const { ReportModel} = require("../models/reportModel")
const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ msg: "Users work" })
})
router.get("/myInfo", auth, async (req, res) => {
  try {
    let userInfo = await UserModel.findOne({ _id: req.tokenData.user_id }, { password: 0 });
    res.json(userInfo);
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
})

router.get("/usersList", authAdmin, async (req, res) => {
  try {
    let data = await UserModel.find({}, { password: 0 });
    res.json(data)
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
})

router.post("/", async (req, res) => {
  console.log(req.body);
  let validBody = validUser(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let user = new UserModel(req.body);
    user.password = await bcrypt.hash(user.password, 10);

    await user.save();
    user.password = "******";
    res.status(201).json(user);
  }
  catch (err) {
    if (err.code == 11000) {
      return res.status(500).json({ msg: "Email already in system, try log in", code: 11000 })

    }
    console.log(err);
    res.status(500).json({ msg: "err", err })
  }
})

router.post("/login", async (req, res) => {
  let validBody = validLogin(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
      return res.status(401).json({ msg: "Password or email is worng ,code:1" })
    }
    let authPassword = await bcrypt.compare(req.body.password, user.password);
    if (!authPassword) {
      return res.status(401).json({ msg: "Password or email is worng ,code:2" });
    }
    let token = createToken(user._id, user.role);
    res.json({ token });
  }
  catch (err) {
    console.log(err)
    res.status(500).json({ msg: "err", err })
  }
})

router.put("/:editId", auth, async (req, res) => {

  try {
      let editId = req.params.editId;
      let data;
      console.log(req.tokenData.role);
      if (req.tokenData.role === "admin") {

        data = await UserModel.updateOne({ _id: editId }, { $set: { active:false } });
      } else {
        data = await UserModel.updateOne({ _id: editId, user_id: req.tokenData.user_id }, { $set: { active:false} });
      }
      res.json(data);
  }
  catch (err) {
      console.log(err);
      res.status(500).json({ msg: "there error try again later", err })
  }
})
router.put("/:editId", auth,  async (req, res) => {
  let validBody = validUser(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let editId = req.params.editId;
    let data;
    console.log(req.tokenData.role);
    if (req.tokenData.role == "admin") {
      data = await UserModel.updateOne({ _id: editId }, req.body)
    }
    else {
      console.log(req.tokenData.user_id);
      data = await UserModel.updateOne({ _id: editId, user_id: req.tokenData.user_id }, req.body)
    }
    res.json(data);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ msg: "there error try again later", err })
  }
})
router.post("/report/:id", auth, async (req, res) => {
  // console.log(req.tokenData);
  // console.log(req.tokenData.role);
  let reportBody={
    id_reporter: req.tokenData._id,
    id_reportee:req.params.id,
    Message:req.body.Message
  }
  let validBody = validReport(reportBody);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    let report = new ReportModel(reportBody);
    await report.save();
    res.status(201).json(report);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err })
  }
})



module.exports = router;