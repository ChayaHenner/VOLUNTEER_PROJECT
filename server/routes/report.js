const express = require('express');
const router = express.Router();
const { auth, authAdmin } = require("../middlewares/auth");
const { ReportModel } = require("../models/reportModel");
const { validReport } = require("../validation/reportValidation")

router.get("/", authAdmin, async (req, res) => {
    try {
      let data = await ReportModel.find().populate({
        path: 'id_reportee id_reporter',
        select: '_id full_name'
    });
      res.json(data)
    }
    catch (err) {
      console.log(err)
      res.status(500).json({ msg: "err", err })
    }
  })
  module.exports = router;