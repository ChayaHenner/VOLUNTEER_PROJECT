const mongoose = require("mongoose");

let reportSchema = new mongoose.Schema({
   id_reporter: String,
   id_reportee: String,
   Message: String
})

exports.reportModel = mongoose.model("report", reportSchema);

