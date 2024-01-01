const mongoose = require("mongoose");

let reportSchema = new mongoose.Schema({
   id_reporter:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
   }] ,
   id_reportee:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
   }] ,
   Message: String
})


exports.ReportModel = mongoose.model("report", reportSchema);

